import { MOCK_PROJECTS } from "./projects/MockProjects";

function ProjectsPage() {
  return (
    <>
  <h1>Resumen de datos</h1>
  <pre>{JSON.stringify(MOCK_PROJECTS, null, ' ')}</pre>
  </>
  );
}

export default ProjectsPage;