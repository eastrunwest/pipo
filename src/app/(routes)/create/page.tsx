'use client';
import React, { useState, useRef, useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CloudUploadIcon, SendIcon } from 'lucide-react';
import { Button, TextArea } from '@radix-ui/themes';
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
    <form
      className="max-w-md mx-auto"
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
      <div className="flex flex-col gap-4">
        <div>
          <div className="min-h-64 p-2 bg-gray-400 rounded-md relative">
            {imageUrl && (
              <img src={imageUrl} className="rounded-md" alt="" />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <input
                onChange={ev => setFile(ev.target.files?.[0] || null)}
                className="hidden"
                type="file"
                ref={fileInRef} />
              <Button
                disabled={isUploading}
                onClick={() => fileInRef?.current?.click()}
                type="button" variant="surface">
                {!isUploading && (
                  <CloudUploadIcon size={16} />
                )}
                {isUploading ? 'Uploading...' : 'Choose image'}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <TextArea name="title" className="h-16" placeholder="Add event title..." />
        </div>
        <div className="flex flex-col gap-2">
          <TextArea name="description" className="h-16" placeholder="Add event description..." />
        </div>
      </div>
      <div className="flex mt-4 justify-center">
        <Button type="submit">
          <SendIcon size={16} />
          Publish
        </Button>
      </div>
    </form>
  );
}