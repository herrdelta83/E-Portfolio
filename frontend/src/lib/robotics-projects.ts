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
  // 0-100, hand-set by you as work actually progresses.
  completion: number;
};

export const ROBOTICS_PROJECTS: RoboticsProject[] = [
  {
    slug: "ros2-rover-with-slam",
    name: "ROS2 Rover with SLAM",
    stack: "C++ · ROS2 · React · Python · Docker",
    blurb:
      "A differential-drive rover built on ROS2, capable of manualteleoperation and basic SLAM (mapping + localization) in an indoor environment.",
    feedbackLoop:
      "TODO — evidence of a closed feedback loop: PID tuning graph, SLAM map output, or a control loop diagram. Not just \"wired a sensor.\"",
    failureModes:
      "TODO — documented failure modes: what didn't work, and why.",
    wiringDiagram: "TODO — link or embed the wiring diagram / schematic.",
    ciStatus: "TODO — add CI badge (firmware build + test status)",
    completion: 0,
  },
  {
    slug: "imu-racquetball-swing-analyzer",
    name: "IMU Racquetball Swing Analyzer",
    stack: "C++ · Arduino · React · Python · Jupyter · Docker",
    blurb:
      "An ESP32 + IMU mounted on a racquetball racquet, logging swing data over BLE and classifying shot type (kill shot, ceiling ball, pinch, etc.) via a lightweight on-device or companion-app classifier.",
    feedbackLoop:
      "TODO — evidence of a closed feedback loop: PID tuning graph, SLAM map output, or a control loop diagram. Not just \"wired a sensor.\"",
    failureModes:
      "TODO — documented failure modes: what didn't work, and why.",
    wiringDiagram: "TODO — link or embed the wiring diagram / schematic.",
    ciStatus: "TODO — add CI badge (firmware build + test status)",
    completion: 0,
  },
  {
    slug: "racquetball-cv-trajectory-analyzer",
    name: "Racquetball CV Trajectory Analyzer",
    stack: "Python · OpenCV · MediaPipe · React · Docker",
    blurb:
      "Computer vision pipeline (OpenCV/MediaPipe) processing match footage to track ball trajectory off the front wall, classify serve types, and estimate spin from bounce angle.",
    feedbackLoop:
      "TODO — evidence of a closed feedback loop: PID tuning graph, SLAM map output, or a control loop diagram. Not just \"wired a sensor.\"",
    failureModes:
      "TODO — documented failure modes: what didn't work, and why.",
    wiringDiagram: "TODO — link or embed the wiring diagram / schematic.",
    ciStatus: "TODO — add CI badge (firmware build + test status)",
    completion: 0,
  },
];

export function getRoboticsProject(slug: string): RoboticsProject | undefined {
  return ROBOTICS_PROJECTS.find((p) => p.slug === slug);
}
