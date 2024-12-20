"use client";

import { useState, useRef } from "react";
import axios from "axios";

interface ApiConfig {
    name: string;
    getUploadUrl: string;
    uploadUrl?: string;
    apiKey: string;
}

interface UploadStatus {
    name: string;
    status: string;
    progress: number;
}

interface VideoData {
    video_url: string;
    MimeType: string;
    HashID: string;
    Size: number;
    Name: string;
}

export default function VideoUploader() {
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [videoName, setVideoName] = useState<string>("");
    const [uploadStatuses, setUploadStatuses] = useState<UploadStatus[]>([]);
    const [selectedApis, setSelectedApis] = useState<{ [key: string]: boolean }>({});
    const [videoDataList, setVideoDataList] = useState<VideoData[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const apiConfigs: ApiConfig[] = [
        {
            name: "VidGuard",
            getUploadUrl: "https://api.vidguard.to/v1/upload/server",
            apiKey: "jJYOdq8a5e9o", // Replace with your actual API Key
        },
        // Add more API configurations as needed
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setVideoFile(file);
            setVideoName(file.name);
        }
    };

    const handleApiSelection = (apiName: string) => {
        setSelectedApis(prev => ({ ...prev, [apiName]: !prev[apiName] }));
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVideoName(e.target.value);
    };

    const uploadVideo = async () => {
        if (!videoFile) {
            alert("Please select a video file.");
            return;
        }

        const selectedApiConfigs = apiConfigs.filter(config => selectedApis[config.name]);

        if (selectedApiConfigs.length === 0) {
            alert("Please select at least one API for upload.");
            return;
        }

        setUploadStatuses(selectedApiConfigs.map(config => ({ name: config.name, status: "Preparing...", progress: 0 })));

        const uploadPromises = selectedApiConfigs.map(async (config, index) => {
            try {
                const serverResponse = await axios.get(`${config.getUploadUrl}?key=${config.apiKey}`);
                const uploadUrl = serverResponse.data.result.url;

                setUploadStatuses(prev => prev.map((status, i) =>
                    i === index ? { ...status, status: "Uploading..." } : status
                ));

                const formData = new FormData();
                // Use the custom name for the file
                const renamedFile = new File([videoFile], videoName, { type: videoFile.type });
                formData.append("file", renamedFile);
                formData.append("key", config.apiKey);

                const response = await axios.post(uploadUrl, formData, {
                    onUploadProgress: (progressEvent: any) => {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadStatuses(prev => prev.map((status, i) =>
                            i === index ? { ...status, progress } : status
                        ));
                    },
                });

                setUploadStatuses(prev => prev.map((status, i) =>
                    i === index ? { ...status, status: "Uploaded successfully!", progress: 100 } : status
                ));
                setVideoDataList((prev) => [
                    ...prev,
                    {
                        video_url: response.data.result.URL,
                        MimeType: response.data.result.MimeType,
                        HashID: response.data.result.HashID,
                        Size: response.data.result.Size,
                        Name: videoName,
                    },
                ]);
                return response.data;
            } catch (error) {
                console.error(`Error uploading to ${config.name}:`, error);
                setUploadStatuses(prev => prev.map((status, i) =>
                    i === index ? { ...status, status: "Failed to upload. Please try again." } : status
                ));
            }
        });

        await Promise.all(uploadPromises);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-gray-200">Multi-API Video Uploader</h1>
            <div className="mb-4">
                <input
                    type="file"
                    accept="video/mp4,video/x-m4v,video/*"
                    onChange={handleFileChange}
                    className="sr-only"
                    id="video-upload"
                    ref={fileInputRef}
                />
                <label
                    htmlFor="video-upload"
                    className="cursor-pointer inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Select Video
                </label>
                {videoFile && (
                    <span className="ml-2 text-gray-200">
                        Selected: {videoFile.name}
                    </span>
                )}
            </div>
            {videoFile && (
                <div className="mb-4">
                    <label htmlFor="video-name" className="block text-sm font-medium text-gray-200 mb-1">
                        Video Name:
                    </label>
                    <input
                        type="text"
                        id="video-name"
                        value={videoName}
                        onChange={handleNameChange}
                        className="w-full p-2 bg-gray-700 text-gray-200 rounded"
                        aria-label="Video name"
                    />
                </div>
            )}
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-200 mb-2">Select APIs for upload:</h2>
                {apiConfigs.map((config, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id={`api-${index}`}
                            checked={selectedApis[config.name] || false}
                            onChange={() => handleApiSelection(config.name)}
                            className="mr-2"
                        />
                        <label htmlFor={`api-${index}`} className="text-gray-200">{config.name}</label>
                    </div>
                ))}
            </div>
            <button
                onClick={uploadVideo}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                disabled={!videoFile}
            >
                Upload Video to Selected APIs
            </button>
            <div className="mt-6">
                {uploadStatuses.map((status, index) => (
                    <div key={index} className="mb-4 p-4 bg-gray-800 rounded">
                        <h2 className="text-lg font-semibold text-gray-200">{status.name}</h2>
                        <p className="text-gray-300">{status.status}</p>
                        {status.progress > 0 && (
                            <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${status.progress}%` }}
                                ></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-200 mb-2">Uploaded Videos:</h2>
                {videoDataList.map((video, index) => (
                    <div key={index} className="mb-4 p-4 bg-gray-800 rounded">
                        <p className="text-gray-200 font-semibold">{video.Name}</p>
                        <p className="text-gray-300">URL: {video.video_url}</p>
                        <p className="text-gray-300">Type: {video.MimeType}</p>
                        <p className="text-gray-300">Size: {video.Size} bytes</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

