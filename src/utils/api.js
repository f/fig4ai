import fetch from 'node-fetch';

export async function getFigmaFileData(fileId) {
    const response = await fetch(`https://api.figma.com/v1/files/${fileId}`, {
        headers: {
            'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN
        }
    });

    if (!response.ok) {
        let errorMessage = `Figma API error: ${response.statusText}`;
        try {
            const errorBody = await response.json();
            errorMessage += ` - ${JSON.stringify(errorBody)}`;
        } catch (e) {
            // If parsing JSON fails, continue with the original error message
        }
        throw new Error(errorMessage);
    }

    return response.json();
} 