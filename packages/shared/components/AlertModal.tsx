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

export type AlertModalProps = {
  modalTitle?: string;
  modalContent?: string;
  btnTitle: string;
  onClick?: VoidFunction;
} & Omit<ModalProps, 'children'>;

export default function AlertModal({
  modalTitle,
  modalContent,
  btnTitle,
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
        <ModalBody whiteSpace="pre-wrap">{modalContent}</ModalBody>
        <ModalFooter>
          <Button
            colorScheme="gray"
            mr={3}
            onClick={onClose}
            _active={{ bg: undefined }}
            _hover={{ bg: undefined }}
          >
            취소하기
          </Button>
          <Button
            variant="ghost"
            bgColor="orange.400"
            color="white"
            onClick={onClick}
            _active={{ bg: undefined }}
            _hover={{ bg: undefined }}
          >
            {btnTitle}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
