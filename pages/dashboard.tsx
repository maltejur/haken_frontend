import { Button, Card, Description, Text, User } from "@geist-ui/react";
import Layout from "components/layout";
import { withAuth } from "hooks/auth";
import { useTasks } from "hooks/tasks";
import { Task } from "lib/models";
import Link from "next/link";

export default function Dashboard() {
  const tasks = useTasks();

  return (
    <Layout>
      <Text h3>Verfügbare Aufgaben</Text>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {tasks.map((group) => (
          <>
            <Description style={{ marginTop: 30 }} title={group.name} />
            {group.tasks.map((task) => (
              <Card shadow className="dashboardCard" key={task.id}>
                <Card.Content>
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
          </>
        ))}
      </div>
    </Layout>
  );
}

export const getServerSideProps = withAuth();
