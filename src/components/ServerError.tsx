import * as React from "react";
import Dino from "../../public/img/server-error-dino.png";

type ServerDownMessage = {
  title: string;
  subtitle: string;
};

const ServerError: React.FC = () => {
  const serverDownMessages: ServerDownMessage[] = [
    {
      title: "Dino Timeout",
      subtitle: "Our T-Rex Admin Needs a Java Break!",
    },
    {
      title: "Server Rex-tinction",
      subtitle: "Don't Panic, Our Brontos are Fixing the Glitch!",
    },
    {
      title: "Jurassic Server Snooze",
      subtitle: "Hang Tight, Velociraptor IT Team on the Chase!",
    },
    {
      title: "Coding Catastrophe",
      subtitle: "Our Pixel Raptors Are Roaring for a Restart!",
    },
    {
      title: "Glitch-o-saurus",
      subtitle: "Hold onto Your Fossils, We're Fixing the Flux!",
    },
    {
      title: "Tech Triassic Timeout",
      subtitle: "Don't Worry, Our Cybernetic Stegos Are on the Job!",
    },
    {
      title: "Byte-sized Extinction",
      subtitle: "Just a Dino Restart Away from Cyber Normalcy!",
    },
    {
      title: "Mesozoic Malfunction",
      subtitle: "Our Dilophosaurus Engineers Working on a Fix!",
    },
  ];

  const getRandomServerDownMessage = (): ServerDownMessage => {
    const randomIndex = Math.floor(Math.random() * serverDownMessages.length);
    return serverDownMessages[randomIndex];
  };

  const [serverDownMessage, setServerDownMessage] =
    React.useState<ServerDownMessage>(getRandomServerDownMessage());

  React.useEffect(() => {
    const dinoMessageInterval = setInterval(() => {
      setServerDownMessage(getRandomServerDownMessage());
    }, 5000);

    return () => {
      clearInterval(dinoMessageInterval);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <img src={Dino} alt="Server Error" />
      <div className="flex flex-col gap-2 items-center justify-center">
        <div className="font-serif text-3xl lg:text-5xl font-bold text-center">
          {serverDownMessage?.title}
        </div>
        <div className="font-sans lg:text-2xl font-bold text-center text-dark-1-800">
          {serverDownMessage?.subtitle}
        </div>
      </div>
    </div>
  );
};

export default ServerError;
