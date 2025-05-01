import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Lee la variable de entorno PRIVADA del servidor
  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL; 

  if (!n8nWebhookUrl) {
    console.error('N8N_WEBHOOK_URL is not defined in server environment variables.');
    // Devuelve un error JSON al cliente
    return NextResponse.json({ success: false, message: 'Server configuration error.' }, { status: 500 });
  }

  try {
    // Obtiene los datos JSON enviados desde el formulario
    const formData = await request.json(); 

    console.log('Server API /api/submit-form received data:', formData);
    console.log('Server API forwarding to n8n URL:', n8nWebhookUrl);

    // Realiza la llamada fetch al webhook de n8n
    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Reenvía los datos del formulario
    });

    console.log('n8n response status:', n8nResponse.status, 'OK:', n8nResponse.ok);

    // Verifica si la respuesta de n8n fue exitosa
    if (!n8nResponse.ok) {
      let errorDetails = `n8n webhook responded with status: ${n8nResponse.status}`;
      try {
        // Intenta obtener un mensaje de error más específico de n8n
        const n8nErrorData = await n8nResponse.json();
        console.error('n8n error data:', n8nErrorData);
        errorDetails = n8nErrorData.message || errorDetails;
      } catch (jsonError) {
         console.error('Could not parse n8n error response as JSON');
      }
       // Devuelve el error de n8n al cliente
      return NextResponse.json({ success: false, message: errorDetails }, { status: n8nResponse.status });
    }

    // Si la respuesta de n8n fue OK, devuelve éxito al cliente
    return NextResponse.json({ success: true, message: 'Data forwarded to n8n successfully.' });

  } catch (error) {
    console.error('Error in /api/submit-form:', error);
    let errorMessage = 'Internal server error while processing form.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
     // Devuelve un error genérico del servidor al cliente
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
} 