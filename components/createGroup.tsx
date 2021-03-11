import { Input, Modal, Textarea } from "@geist-ui/react";
import axios from "axios";
import { fetchTasks } from "hooks/tasks";
import Cookies from "js-cookie";
import React, { FormEvent, useRef, useState } from "react";

export default function CreateGroup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const submitBtn = useRef<HTMLInputElement>();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    await axios.post(
      "https://poodlenoodle42.spdns.org:8080/auth/groups/new",
      {
        name,
        description,
      },
      {
        headers: {
          token: Cookies.get("token"),
        },
      }
    );
    fetchTasks(Cookies.get("token"));
    setLoading(false);
    onClose();
  }

  return (
    <Modal open={open} onClose={() => onClose()}>
      <Modal.Title>Gruppe erstellen</Modal.Title>
      <Modal.Content>
        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          <div style={{ marginBottom: 15 }}>
            <Input
              placeholder="Gruppenname"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={loading}
            />
          </div>
          <Textarea
            placeholder="Beschreibung"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            disabled={loading}
          />
          <input type="submit" style={{ display: "none" }} ref={submitBtn} />
        </form>
      </Modal.Content>
      <Modal.Action disabled={loading} passive onClick={() => onClose()}>
        Abbrechen
      </Modal.Action>
      <Modal.Action loading={loading} onClick={() => submitBtn.current.click()}>
        Speichern
      </Modal.Action>
    </Modal>
  );
}
