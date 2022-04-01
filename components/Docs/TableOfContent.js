import { Timeline } from "@mantine/core";

export default function TableOfContent({ links,activeNav }) {
  return (
    <Timeline color={"pink"} active={activeNav} radius="xs" lineWidth={2} bulletSize={14}>
      {links.map((item, index) => (
        <Timeline.Item        
          key={index}
          title={item.label}
          bulletSize={14}
        ></Timeline.Item>
      ))}
    </Timeline>
  );
}
