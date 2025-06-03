import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function previewImage(file: File | undefined, elementId: string) {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
        const imgElement = document.getElementById(elementId) as HTMLImageElement;
        if (imgElement) {
            imgElement.src = e.target?.result as string;
        }
    };
}

export function clickInputFile(inputName: string) {
    const inputElement = document.querySelector(`input[name="${inputName}"]`) as HTMLInputElement;
    inputElement?.click();
}
