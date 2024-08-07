import { json } from '@sveltejs/kit';
import type { RateRequest, Rate } from '$src/lib/types';
import { prompts } from '$src/lib/utils/prompts';
import { generateTextResponse } from '$server/IA';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	// Obtener los datos de la pagina
	const requestData: RateRequest = await request.json();

	// Generar prompt con respecto a los datos de la pagina
	const { sys, prompt } = prompts.CALIFICAR_CONTENIDO(requestData);

	const result = await generateTextResponse(sys, prompt);

	const response: Rate = JSON.parse(result.slice(result.indexOf('{'), result.lastIndexOf('}') + 1));

	return json(response);
};
