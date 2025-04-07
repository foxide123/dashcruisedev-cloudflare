import { AlertCircle } from "lucide-react"
import {
    Alert,
    AlertDescription, 
    AlertTitle,
} from "@/components/ui/alert";

export function AlertBox({message} : {message: string}){
    return (
        <Alert variant="destructive">
            <AlertCircle className="w-4 h-4"/>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                ${message}
            </AlertDescription>
        </Alert>
    )
}