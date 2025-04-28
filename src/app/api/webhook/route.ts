import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, problem, software, jobRole } = await request.json();

    if (!firstName || !lastName || !email || !problem || !software || !jobRole) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
  
    // Aquí deberás reemplazar con tu URL de webhook de n8n
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!n8nWebhookUrl) {
      return NextResponse.json(
        { error: 'Webhook URL no configurada' },
        { status: 500 }
      );
    }

    // Enviar datos a n8n
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        problem,
        software,
        jobRole,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Error al enviar datos a n8n');
    }

    return NextResponse.json(
      { message: 'Datos enviados exitosamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en webhook:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
  
} 