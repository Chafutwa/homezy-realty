import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { name, email, phone, propertyType } = body;

        const data = await resend.emails.send({
            from: "Homezy Realty <onboarding@resend.dev>",
            to: ["homezyrealtyke@gmail.com"],
            subject: "New Property Inquiry",
            html: `
                <div style="font-family:sans-serif;">
                    <h2>New Lead Submission</h2>

                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Property Type:</strong> ${propertyType}</p>
                </div>
            `,
        });

        return Response.json(data);

    } catch (error) {
        return Response.json({ error });
    }
}