interface EmailTemplateProps {
  name: string;
  message: string;
}

export function EmailTemplate({ name, message }: EmailTemplateProps) {
  return (
    <div>
      <h1>New message from {name}</h1>
      <p>{message}</p>
    </div>
  );
}
