function Messages({ messages }: { messages: Array<{ role: string; text: string }> }) {
  return (
    <div className="h-[340px] space-y-5 overflow-y-auto p-5">
      {messages.map((message, index) => (
        <div key={message.text + index} className="flex gap-3">
          <div className="max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6">
            {message.role === 'user' ? (
              <div className="rounded-br-md bg-primary text-primary-foreground">{message.text}</div>
            ) : (
              <div className="rounded-bl-md bg-secondary text-muted-foreground">{message.text}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}