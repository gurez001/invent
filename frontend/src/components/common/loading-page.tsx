import { Loader2 } from 'lucide-react'

export default function LoadingPage() {
    return (
        <div className="absolute w-full">
            <div className="flex flex-col items-center justify-center w-[100%] bg-tansparent">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-lg font-semibold text-center text-foreground">Loading...</p>
                <p className="mt-2 text-sm text-center text-muted-foreground">Please wait while we fetch your content.</p>
            </div>
        </div>
    )
}

