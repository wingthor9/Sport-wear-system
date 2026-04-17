"use client"

import { useState } from "react"
import { Upload, X } from "lucide-react"
import Image from "next/image"

type Props = {
    files: File[]
    setFiles: (files: File[]) => void
    max?: number
}

export default function ImageUpload({ files, setFiles, max = 5 }: Props) {
    const [dragging, setDragging] = useState(false)

    const handleFiles = (newFiles: FileList | null) => {
        if (!newFiles) return
        const fileArray = Array.from(newFiles)
        const updated = [...files, ...fileArray].slice(0, max)
        setFiles(updated)
    }

    const removeImage = (index: number) => {
        const updated = files.filter((_, i) => i !== index)
        setFiles(updated)
    }

    return (
        <div className="space-y-4">
            {/* drop zone */}
            <div
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
        ${dragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
                onDragOver={(e) => {
                    e.preventDefault()
                    setDragging(true)
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                    e.preventDefault()
                    setDragging(false)
                    handleFiles(e.dataTransfer.files)
                }}
            >
                <Upload className="mx-auto mb-2 w-8 h-8 text-gray-400" />

                <p className="text-sm text-gray-600">
                    Drag & drop images here
                </p>

                <p className="text-xs text-gray-400">
                    or click to upload (max {max})
                </p>

                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                    id="imageUpload"
                />

                <label htmlFor="imageUpload" className="cursor-pointer block mt-2">
                    Select Images
                </label>
            </div>

            {/* preview grid */}
            {files.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                    {files.map((file, index) => {
                        const preview = URL.createObjectURL(file)

                        return (
                            <div key={index} className="relative group">

                                <Image
                                    src={preview}
                                    width={48}
                                    height={48}
                                    className="w-full h-24 object-cover rounded"
                                    alt="preview"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                                >
                                    <X size={14} />
                                </button>

                            </div>
                        )
                    })}
                </div>
            )}

        </div>
    )
}