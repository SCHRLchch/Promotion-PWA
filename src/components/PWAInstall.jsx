import { useState, useEffect } from "react";
import styled from "styled-components";
import { MdOutlineInstallDesktop } from "react-icons/md";

const InstallButton = styled.button`
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
`;

const AddToHomeButton = styled.button`
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  padding: 0px;
  border-radius: 10px;
  transition: background-color 0.3s;
  font-size: 20px;

  border: none;
  background-color: ${({ theme }) => theme.cardBackground};
`;

const PWAInstall = () => {
  let [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt !== null) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        deferredPrompt = null;
      }
    }
  };

  const handleAddToHomeClick = () => {
    // Logic to add shortcut to the homepage
    alert(
      'Um eine Verknüpfung auf dem Startbildschirm hinzuzufügen, befolgen Sie diese Schritte:\n1. Öffnen Sie das Menü mit den drei Punkten.\n2. Tippen Sie auf "Zum Startbildschirm hinzufügen", "Installationshinweis" oder eine ähnliche Option.\n3. Folgen Sie den Anweisungen, um die Verknüpfung auf dem Startbildschirm Ihres Geräts hinzuzufügen. \nIn Chrome Desktop können Sie auf die linkeste Schaltfläche in der Suchleiste tippen, um zu installieren.'
    );
  };

  return (
    <>
      {deferredPrompt && (
        <InstallButton onClick={handleInstallClick}>
          <MdOutlineInstallDesktop style={{ padding: "10px" }} />
        </InstallButton>
      )}
      {!deferredPrompt && (
        <AddToHomeButton onClick={handleAddToHomeClick}>
          <MdOutlineInstallDesktop style={{ padding: "10px" }} />
        </AddToHomeButton>
      )}
    </>
  );
};

export default PWAInstall;
