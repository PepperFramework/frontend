import {MenuManager} from "./menuManager";

export class TextToSpeechUtil {
    private static ttsApiUrl = "https://if200181.cloud.htl-leonding.ac.at/v1/audio/speech";

    /**
     * Convert text to speech and get the MP3 data as an ArrayBuffer.
     * @param text The text to convert to speech.
     * @param language
     * @returns A Promise resolving to the MP3 data as an ArrayBuffer.
     */
    public static async getMp3Data(text: string, language?: string): Promise<ArrayBuffer> {
        try {
            if (language == undefined) {
                language = "en";
            }

            const payload = {
                model: "tts-1",
                input: text,
                voice: (language == "de") ? "thorsten-emotionally-amused" : "alloy",
                response_format: "mp3",
                speed: 0.8,
            };

            const response = await fetch(this.ttsApiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                console.error(`Failed to fetch TTS data: ${response.statusText}`);
            }

            // Return the raw MP3 data
            return await response.arrayBuffer();
        } catch (error) {
            console.error("Error in TextToSpeechUtils:", error);
            throw error;
        }
    }
}