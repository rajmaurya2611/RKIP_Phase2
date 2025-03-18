import Patent from './Patent';
import Process from './Process';

interface ChatProps {
  activeSub: string;
  onChangeSub?: (sub: string) => void; // Optional if you decide not to use it here
}

const Chat: React.FC<ChatProps> = ({ activeSub, onChangeSub }) => {
  return (
    <div className="">
      {activeSub === 'patent' && <Patent />}
      {activeSub === 'process' && <Process />}
      {activeSub !== 'patent' && activeSub !== 'process' && (
        <div>
          <h2>Please select a valid chat type.</h2>
        </div>
      )}
    </div>
  );
};

export default Chat;
