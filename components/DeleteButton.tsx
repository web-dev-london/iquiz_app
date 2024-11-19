'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';

const DeleteButton = ({ id }: { id: string }) => {
  const { refresh } = useRouter();

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`/api/game/${id}`);
      refresh();
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <Button
      variant="destructive"
      onClick={handleDeleteClick}
    >
      Remove
    </Button>
  )
}

export default DeleteButton;