import { Button, Card, Text, User } from "@geist-ui/react";
import Layout from "components/layout";
import { withAuth } from "hooks/auth";
import { Task } from "lib/models";
import Link from "next/link";

export default function Dashboard() {
  return (
    <Layout>
      <Text h3>Verfügbare Aufgaben</Text>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {([
          {
            id: 0,
            name: "Bank",
            author: "Michał Boron",
            documentUrl: "https://szkopul.edu.pl/c/hhgym-informatik-ag/p/ban/",
          },
          {
            id: 1,
            name: "Auslandsjahr",
            author: "Michał Boron",
            documentUrl: "https://szkopul.edu.pl/c/hhgym-informatik-ag/p/aus/",
          },
          {
            id: 2,
            name: "Olympiade",
            author: "Michał Boron",
            documentUrl:
              "https://szkopul.edu.pl/c/hhgym-informatik-ag/p/olympiade/",
          },
        ] as Task[]).map((task) => (
          <Card
            shadow
            style={{ marginTop: "20px !important", maxWidth: 400 }}
            key={task.id}
          >
            <Card.Content>
              <User name={task.author} />
              <Text h4>{task.name}</Text>
            </Card.Content>
            <Card.Actions style={{ justifyContent: "flex-end" }}>
              <Link href={`/task/${task.id}`} passHref>
                <Button size="small" auto type="success">
                  Bearbeiten
                </Button>
              </Link>
            </Card.Actions>
          </Card>
        ))}
      </div>
    </Layout>
  );
}

export const getServerSideProps = withAuth();
