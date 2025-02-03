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
    <div className="flex items-center justify-center min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900 via-black to-gray-900">
      <div className="w-full max-w-4xl p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-2">
            Create Your Story
          </h1>
          <p className="text-blue-200/80">Share your vision with the world</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image Upload Section */}
          <Card className="bg-gray-900/50 border border-gray-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-blue-300">Media Upload</CardTitle>
              <CardDescription className="text-gray-400">Add visual content to your event</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative group">
                <div className={`min-h-[300px] rounded-lg border-2 border-dashed border-gray-700 transition-all duration-300 ${!imageUrl ? 'hover:border-blue-500' : ''} relative overflow-hidden`}>
                  {imageUrl ? (
                    <div className="relative h-[300px] w-full">
                      <img src={imageUrl} className="absolute inset-0 w-full h-full object-cover rounded-lg" alt="" />
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
                      <ImageIcon size={48} className="text-gray-600 mb-2" />
                      <Button
                        disabled={isUploading}
                        onClick={() => fileInRef?.current?.click()}
                        variant="outline"
                        className="bg-black/30 border-blue-500/50 hover:bg-black/50 hover:border-blue-500"
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

          {/* Content Section */}
          <Card className="bg-gray-900/50 border border-gray-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-blue-300">Content Details</CardTitle>
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
                      className="w-full min-h-[60px] bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 rounded-lg transition-all duration-200" 
                      placeholder="Enter your title..."
                    />
                  </div>
                  <div className="space-y-2">
                    <TextArea 
                      name="description" 
                      className="w-full min-h-[120px] bg-black/30 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 rounded-lg transition-all duration-200" 
                      placeholder="Tell your story..."
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8"
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