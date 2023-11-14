import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';

type AlertModalProps = {
  modalTitle: string;
  modalContent: string;
  onClick?: VoidFunction;
} & Omit<ModalProps, 'children'>;

export default function AlertModal({
  modalTitle,
  modalContent,
  isOpen,
  onClose,
  onClick,
}: AlertModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="lg" fontWeight="bold">
          {modalTitle}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{modalContent}</ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            취소하기
          </Button>
          <Button
            variant="ghost"
            bgColor="orange.400"
            color="white"
            onClick={onClick}
          >
            마감하기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
