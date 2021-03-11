import {
  Button,
  Divider,
  Input,
  Select,
  Text,
  Textarea,
} from "@geist-ui/react";
import axios from "axios";
import CreateGroup from "components/createGroup";
import Layout from "components/layout";
import { withAuth } from "hooks/auth";
import { useTasks } from "hooks/tasks";
import Cookies from "js-cookie";
import { useMemo, useRef, useState } from "react";

export default function Upload() {
  const groups = useTasks();
  const [groupId, setGroupId] = useState(-1);
  const [createGroup, setCreateGroup] = useState(false);
  const [loading, setLoading] = useState(false);
  const submitBtn = useRef<HTMLInputElement>();

  const [name, setName] = useState("");
  const [pdf, setPdf] = useState<File>();
  const [description, setDescription] = useState("");

  return (
    <Layout>
      <Text h3>Upload</Text>
      <Text style={{ marginBottom: 5 }}>Gruppe</Text>
      <Select
        width="200px"
        value={groupId.toString()}
        onChange={(value) => setGroupId(Number(value))}
        placeholder="Gruppe"
        dropdownStyle={{ display: createGroup ? "none" : "block" }}
      >
        {groups.map((group) => (
          <Select.Option value={group.id.toString()}>
            {group.name}
          </Select.Option>
        ))}
        <Divider />
        <Select.Option
          onClick={(event) => {
            event.preventDefault();
            setCreateGroup(true);
          }}
        >
          Neue Gruppe
        </Select.Option>
      </Select>
      <CreateGroup open={createGroup} onClose={() => setCreateGroup(false)} />
      {groupId >= 0 && (
        <>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              setLoading(true);
              console.log(pdf);
              const formData = new FormData();
              formData.append("name", name);
              formData.append("pdf", pdf);
              formData.append("description", description);
              await axios.post(
                `https://poodlenoodle42.spdns.org:8080/auth/groups/${groupId}/newTask`,
                formData,
                { headers: { token: Cookies.get("token") } }
              );
              setLoading(false);
            }}
          >
            <Text style={{ marginBottom: 5 }}>Aufgabenname</Text>
            <Input
              required
              name="name"
              disabled={loading}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Text style={{ marginBottom: 5 }}>Dokument</Text>
            <Input
              required
              name="pdf"
              type="file"
              typeof=""
              accept=".pdf"
              disabled={loading}
              onChange={(event) => setPdf(event.target.files[0])}
            />
            <Text style={{ marginBottom: 5 }}>Beschreibung</Text>
            <Textarea
              name="description"
              disabled={loading}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <input type="submit" style={{ display: "none" }} ref={submitBtn} />
            <Button
              type="success"
              style={{ display: "block", marginTop: 20 }}
              onClick={() => submitBtn.current.click()}
              loading={loading}
            >
              Speichern
            </Button>
          </form>
        </>
      )}
    </Layout>
  );
}

export const getServerSideProps = withAuth();
