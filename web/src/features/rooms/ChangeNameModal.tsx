import React from 'react';
import { Modal, Input, Group, Button, Stack, Text } from '@mantine/core';
import { useValidatedInput } from '../../hooks/useValidatedInput';
import { Room } from './types';
import { useUpdateRoom } from './queries';

type Props = {
  room: Room;
  isOpen: boolean;
  onClose: () => void;
};

export const ChangeNameModal = ({ room, isOpen, onClose }: Props) => {
  const validator = React.useCallback((value: string) => {
    return /^.{3,20}$/.test(value) || 'Entre 3 y 20 caracteres';
  }, []);

  const {
    value: name,
    onChange,
    setValue,
    validation,
  } = useValidatedInput({
    initialValue: room.name,
    validator,
  });

  const [update, isUpdating] = useUpdateRoom();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    update(
      { id: room.id, name },
      {
        onSuccess: (updated) => {
          setValue(updated.name);
          onClose();
        },
      }
    );
  };

  return (
    <Modal
      opened={isOpen}
      onClose={() => {
        setValue(room.name);
        onClose();
      }}
      title="Cambiar nombre"
      centered
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing="xs">
          <Input
            value={name}
            variant="filled"
            onChange={onChange}
            invalid={!validation.isValid}
          />

          {validation.message && (
            <Text color="red" size="sm">
              {validation.message}
            </Text>
          )}

          <Group position="right">
            <Button
              type="submit"
              disabled={!validation.isValid || room.name === name}
              loading={isUpdating}
            >
              Guardar
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
