interface OutgoingMessageProps {
    message: {content: string};
}

const OutgoingMessage: React.FC<OutgoingMessageProps> = ({ message }) => {
  return (
    <div className="flex justify-end">
          <div className="p-2 mb-3 rounded-lg w-auto break-all bg-blue-500 text-white">
              {message.content}
          </div>
    </div>
  );
}

export default OutgoingMessage