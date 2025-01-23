import { px } from "@/px";
import React from "react";
import styled from "styled-components";
import UiButton from "./UiButton";
import UiIcon from "./UiIcon";
import UiOverlay from "./UiOverlay";
import sizes from "@/utils/sizes";

type Size = "lg" | "md" | "sm";
type Position = "center" | "right";
type BackgroundVariant = "dark" | "light";

interface Props {
  children: React.ReactNode;
  position?: Position;
  size?: Size;
  title?: string;
  hideModalClose?: boolean;
  bgVariant?: BackgroundVariant;
  onClose: () => void;
  goPrev?: () => void;
  isVisible: boolean;
}
export default function UiModal({
  children,
  title,
  position,
  size = "lg",
  bgVariant = "dark",
  hideModalClose,
  onClose,
  goPrev,
  isVisible,
}: Props) {
  function closeModal() {
    if (hideModalClose) return;

    onClose();
  }
  return (
    <UiOverlay onClick={closeModal} isVisible={isVisible}>
      <Modal>
        <ModalCard
          onClick={(event) => {
            event.stopPropagation();
          }}
          position={position}
          size={size}
          bgVariant={bgVariant}
        >
          <div className="modal-inner">
            <header className="modal-header">
              {goPrev && (
                <UiButton variant="neutral" onClick={goPrev}>
                  <UiIcon icon="ArrowLeft" size="16" />
                </UiButton>
              )}
              <h2>{title}</h2>
              {!hideModalClose && (
                <UiButton variant="neutral" onClick={closeModal}>
                  <UiIcon icon="X" size="20" />
                </UiButton>
              )}
            </header>
            {children}
          </div>
        </ModalCard>
      </Modal>
    </UiOverlay>
  );
}

function positionStyling({ position, size }: CardProps) {
  if (position === "right") {
    return `
      position: fixed;
      bottom: 0;
      top: 0;
      right: 0;
      left: initial;
      border-radius: 0;
      max-height: 100%;
      width: 80%;

      .modal-header {
        border-bottom: ${px(1)} solid var(--color-gray-20);
        padding: ${px(26)} ${px(24)};
      }
     
      @media only screen and (min-width: ${sizes.tabletLargeWidth}) {
        width: 60%;
      }
      @media only screen and (min-width: ${sizes.mobile}) {
        width: 60%;
      }
      @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
        width: 50%;
        max-width: ${px(1000)};
      }
    `;
  }
  if (position === "center") {
    return `
    position: fixed;
    margin: auto;
    width: 80%;
    border-radius: ${px(16)};
    
    .modal-header h2 {
      text-align: center;
      flex-grow: 1;
      margin-left: 40px !important;
    }
    @media only screen and (min-width: ${sizes.mobile}) {
      position: static;
      width: 70%;
    }
    @media only screen and (min-width: ${sizes.tabletLargeWidth}) {
      position: static;
      width: 70%;
    }
    @media only screen and (min-width: ${sizes.laptopSmallWidth}) {
      width: 65%;
    }
    `;
  }

  return `
    position: static;
    margin: auto;
    border-radius: ${px(16)};

    .modal-header h2 {
      text-align: center;
      flex-grow: 1;
      margin-left: 40px !important;
    }
  `;
}

function getWidth(size?: Size) {
  if (size === "sm") return `width: ${px(540)};`;

  if (size === "md") return `width: ${px(724)};`;

  return `width: 50%;`;
}

function getBackgroundVariant(bgVariant?: BackgroundVariant) {
  return bgVariant === "dark" ? "var(--color-gray-20)" : "#ffffff";
}
const Modal = styled.div`
  width: 100%;
  height: fit-content;
`;

interface CardProps {
  size?: Size;
  position?: Position;
  bgVariant?: BackgroundVariant;
}

const ModalCard = styled.div<CardProps>`
  background: ${({ bgVariant }) => getBackgroundVariant(bgVariant)};
  border-top-left-radius: ${px(8)};
  border-top-right-radius: ${px(8)};
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 90%;

  @media only screen and (max-width: ${sizes.mobileLargeWidth}) {
    height: 100vh;
  }

  .modal-inner {
    padding-bottom: ${px(28)};
    height: 87%;

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: ${px(18)} ${px(24)};
      border-bottom: ${px(1)} solid var(--color-gray-20);

      h2 {
        color: var(--color-neutralBlack);
        font-size: ${px(20)};
        font-family: 'thiccboi-extrabold';
        font-weight: 700;
        margin: 0;
      }

      button {
        margin: 0;
      }
    }
  }

  @media only screen and (min-width: ${sizes.mobile}) {
    h2 {
      font-size: ${px(24)} !important;
    }
    ${({ size }) => getWidth(size)}
    ${(cardProps) => positionStyling(cardProps)}
  }
`;
