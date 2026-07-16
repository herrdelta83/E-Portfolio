export type RoboticsProject = {
  slug: string;
  name: string;
  stack: string;
  blurb: string;
  // Recruiter-checklist fields (see README.md "Overall Projects" — Universal +
  // Embedded Systems & Robotics). Everything here is a placeholder — swap in
  // your real project(s) and fill these in.
  feedbackLoop: string;
  failureModes: string;
  wiringDiagram: string;
  ciStatus: string;
  videoUrl?: string;
  repoUrl?: string;
};

export const ROBOTICS_PROJECTS: RoboticsProject[] = [
  {
    slug: "untitled-project-1",
    name: "TODO — name your first embedded/robotics project",
    stack: "TODO — e.g. C · FreeRTOS · ROS2",
    blurb:
      "TODO — one paragraph: what the physical system does, what it senses/actuates, and why it's scoped the way it is.",
    feedbackLoop:
      "TODO — evidence of a closed feedback loop: PID tuning graph, SLAM map output, or a control loop diagram. Not just \"wired a sensor.\"",
    failureModes:
      "TODO — documented failure modes: what didn't work, and why.",
    wiringDiagram: "TODO — link or embed the wiring diagram / schematic.",
    ciStatus: "TODO — add CI badge (firmware build + test status)",
  },
];

export function getRoboticsProject(slug: string): RoboticsProject | undefined {
  return ROBOTICS_PROJECTS.find((p) => p.slug === slug);
}
