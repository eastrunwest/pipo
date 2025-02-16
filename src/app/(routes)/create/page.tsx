'use client';
import React, { useState, useRef, useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CloudUploadIcon, SendIcon, Image as ImageIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TextArea } from '@radix-ui/themes';
import { postEntry } from '@/actions';

export default function CreatePage() {
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) {
    return redirect('/login');
  }

  useEffect(() => {
    if (file) {
      setIsUploading(true);
      const data = new FormData();
      data.set("file", file);
      fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then(response => {
        response.json().then(url => {
          setImageUrl(url);
          setIsUploading(false);
        });
      });
    }
  }, [file]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-black to-gray-900 animate-fadeIn">
      <div className="w-full max-w-4xl p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-2 animate-glow">
            Create Your Event
          </h1>
          <p className="text-cyan-200/80 text-lg animate-pulse">
            Share your vision with the world
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-900/60 border border-gray-700 backdrop-blur-md rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,255,0.6)]">
            <CardHeader>
              <CardTitle className="text-xl text-cyan-300">Media Upload</CardTitle>
              <CardDescription className="text-gray-400">Add visual content to your event</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative group">
                <div className={`min-h-[100px] rounded-lg border-2 border-dashed border-gray-700 transition-all duration-300 ${!imageUrl ? 'group-hover:border-cyan-500' : ''} relative overflow-hidden`}>
                  {imageUrl ? (
                    <div className="relative h-[200px] w-full">
                      <img src={imageUrl} className="absolute inset-0 w-full h-full object-cover rounded-lg" alt="Event media" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          onClick={() => fileInRef?.current?.click()}
                          variant="outline"
                          className="bg-black/50 border-white/20 hover:bg-black/70"
                        >
                          Change Image
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <ImageIcon size={48} className="text-gray-400 mb-2 animate-pulse" />
                      <Button
                        disabled={isUploading}
                        onClick={() => fileInRef?.current?.click()}
                        variant="outline"
                        className="bg-black/30 border-cyan-500/50 hover:bg-black/50 hover:border-cyan-500 transition-all duration-300"
                      >
                        {!isUploading && (
                          <CloudUploadIcon size={16} className="mr-2" />
                        )}
                        {isUploading ? 'Uploading...' : 'Choose Image'}
                      </Button>
                      <p className="text-sm text-gray-500 mt-2">Drag & drop or click to upload</p>
                    </div>
                  )}
                  <input
                    onChange={ev => setFile(ev.target.files?.[0] || null)}
                    className="hidden"
                    type="file"
                    ref={fileInRef}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/60 border border-gray-700 backdrop-blur-md rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] mb-24">
            <CardHeader>
              <CardTitle className="text-xl text-cyan-300">Content Details</CardTitle>
              <CardDescription className="text-gray-400">Tell your event details</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-6"
                onSubmit={async (event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  try {
                    const id = await postEntry(formData);
                    router.push(`/posts/${id}`);
                    router.refresh();
                  } catch (error) {
                    if (error instanceof Error) {
                      if (error.message === 'not logged in') {
                        router.push('/login');
                      } else {
                        throw error;
                      }
                    } else {
                      console.error('Unexpected error', error);
                    }
                  }
                }}
              >
                <input type="hidden" name="image" value={imageUrl} />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <TextArea 
                      name="title" 
                      className="w-full min-h-[60px] bg-black/40 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 rounded-lg transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,255,255,0.6)]" 
                      placeholder="Enter your title..."
                    />
                  </div>
                  <div className="space-y-2">
                    <TextArea 
                      name="description" 
                      className="w-full min-h-[120px] bg-black/40 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 rounded-lg transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,255,255,0.6)]" 
                      placeholder="Tell your story..."
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.8)]"
                  >
                    <SendIcon size={16} className="mr-2" />
                    Publish
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
