import { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const FileUploadForm = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setImageFile(file);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!imageFile) return;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch("http://127.0.0.1:9000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setImageUrl(data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Envoyer une photo</CardTitle>
        <CardDescription>
          Envoyer une photo et récupérer l'URL
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Photo</Label>
            <Input id="picture" type="file" name="image" onChange={handleFileChange} />
          </div>
          <div className="mt-4">
            <Button type="submit">Envoyer</Button>
          </div>
        </form>
        {imageUrl && (
          <div className="mt-4">
            <h3 className="font-medium">URL de l'image:</h3>
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {imageUrl}
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
