"use client";

import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";


export default function Contact() {

  return (
    <div className="w-full min-h-screen mx-auto flex items-center justify-center">
        <div className="w-xl h-full py-8 px-4 border rounded-2xl shadow-lg">
         <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-4xl font-bold text-center">Contact Us</h1>
            <p className="text-md text-center mt-2 text-muted-foreground">We would love to hear from you!</p>
            <form className="w-full mt-8">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                    <input id="name" type="text" placeholder="Your Name" className="mt-2" required/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input id="email" type="email" placeholder="Your Email" className="mt-2" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">Message</label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline min-h-36" id="message" rows={5} placeholder="Your Message" required></textarea>
                </div>
                <Button type="submit">Send Message</Button>
            </form>
         </div>
        </div>
    </div>
  )
}
