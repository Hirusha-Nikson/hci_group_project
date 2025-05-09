"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";

export default function ModelUploader() {
  const generateUploadUrl = useMutation(api.uploadModel.generateUploadUrl);
  const saveModel = useMutation(api.uploadModel.saveModel);

  const [isUploading, setIsUploading] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [colors, setColors] = useState("");
  const [description, setDescription] = useState("");

  const handleUpload = async () => {
    setIsUploading(true);
    if (!file) return;

    const uploadUrl = await generateUploadUrl();
    const res = await fetch(uploadUrl, {
      method: "POST",
      body: file,
    });

    const defaultName = file.name;

    const { storageId } = await res.json();

    await saveModel({
      storageId,
      name,
      filename: defaultName,
      category,
      price,
      description,
    });
    setIsUploading(false);
    setFile(null);
    setName("");
    setCategory("");
    setPrice(0);
    setDescription("");
    alert("Model uploaded successfully!");
  };

  return (
    <div className="p-4 space-y-2 flex flex-col w-1/2 mx-auto">
      <Input type="file" accept=".glb" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <Input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <Input type="text" placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
      <Input type="number" placeholder="Price" onChange={(e) => setPrice(Number(e.target.value))} />
      <Input type="text" placeholder="Colors" onChange={(e) => setColors(e.target.value)} />
      <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} className="border rounded p-2 min-h-36"/>
      <Button onClick={handleUpload} disabled={isUploading}>{isUploading ? "Uploading..." : "Upload"}</Button>
    </div>
  );
}
