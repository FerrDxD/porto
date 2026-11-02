import { config, fields, collection, singleton } from "@keystatic/core";

const isProd = process.env.NODE_ENV === "production";
const repoOwner = process.env.KEYSTATIC_GITHUB_REPO_OWNER || "FerrDxD";
const repoName = process.env.KEYSTATIC_GITHUB_REPO_NAME || "porto";

export default config({
  storage:
    isProd && process.env.KEYSTATIC_GITHUB_CLIENT_ID
      ? {
          kind: "github",
          repo: `${repoOwner}/${repoName}` as `${string}/${string}`,
        }
      : {
          kind: "local",
        },
  collections: {
    projects: collection({
      label: "Projects & Case Studies",
      slugField: "title",
      path: "content/data/projects/*",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Project Title" } }),
        date: fields.text({ label: "Date Display (e.g. 2026)", defaultValue: "2026" }),
        year: fields.integer({ label: "Year", defaultValue: 2026 }),
        content: fields.text({ label: "Short Summary", multiline: true }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Showcase", value: "showcase" },
            { label: "Organizational", value: "organizational" },
            { label: "Experimental", value: "experimental" },
          ],
          defaultValue: "showcase",
        }),
        role: fields.text({ label: "Role", defaultValue: "Full-Stack Developer" }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Completed", value: "completed" },
            { label: "In Progress", value: "in-progress" },
            { label: "Pending", value: "pending" },
          ],
          defaultValue: "completed",
        }),
        energy: fields.integer({ label: "Energy Metric (0-100)", defaultValue: 80 }),
        stack: fields.array(fields.text({ label: "Tech" }), {
          label: "Technologies Used",
          itemLabel: (props) => props.value,
        }),
        highlights: fields.array(fields.text({ label: "Highlight" }), {
          label: "Key Deliverables",
          itemLabel: (props) => props.value,
        }),
        problem: fields.text({ label: "The Challenge / Problem", multiline: true }),
        approach: fields.text({ label: "The Solution / Approach", multiline: true }),
        architecture: fields.text({ label: "Technical Architecture Notes", multiline: true }),
        metrics: fields.array(
          fields.object({
            label: fields.text({ label: "Metric Label" }),
            value: fields.text({ label: "Metric Value" }),
          }),
          {
            label: "Impact Metrics",
            itemLabel: (props) => `${props.fields.label.value}: ${props.fields.value.value}`,
          },
        ),
        learnings: fields.array(fields.text({ label: "Learning" }), {
          label: "Engineering Insights",
          itemLabel: (props) => props.value,
        }),
        caseStudy: fields.text({ label: "In-Depth Case Study Narrative", multiline: true }),
        repoUrl: fields.url({ label: "GitHub Repository URL" }),
        liveUrl: fields.url({ label: "Live Demo URL" }),
      },
    }),
    skills: collection({
      label: "Technical Skills",
      slugField: "name",
      path: "content/data/skills/*",
      format: { data: "json" },
      schema: {
        name: fields.slug({ name: { label: "Skill Name" } }),
        category: fields.text({ label: "Category (e.g. Languages, Frontend)" }),
        level: fields.select({
          label: "Proficiency Level",
          options: [
            { label: "Beginner", value: "beginner" },
            { label: "Intermediate", value: "intermediate" },
            { label: "Advanced", value: "advanced" },
            { label: "Expert", value: "expert" },
          ],
          defaultValue: "advanced",
        }),
        years: fields.integer({ label: "Years of Experience", defaultValue: 2 }),
      },
    }),
    experience: collection({
      label: "Work Experience",
      slugField: "role",
      path: "content/data/experience/*",
      format: { data: "json" },
      schema: {
        role: fields.slug({ name: { label: "Role / Position" } }),
        company: fields.text({ label: "Company / Organization" }),
        startDate: fields.text({ label: "Start Date (e.g. 2025)" }),
        endDate: fields.text({ label: "End Date (e.g. Present)" }),
        description: fields.text({ label: "Role Description", multiline: true }),
        achievements: fields.array(fields.text({ label: "Achievement" }), {
          label: "Key Achievements",
          itemLabel: (props) => props.value,
        }),
      },
    }),
    testimonials: collection({
      label: "Testimonials & Endorsements",
      slugField: "name",
      path: "content/data/testimonials/*",
      format: { data: "json" },
      schema: {
        name: fields.slug({ name: { label: "Full Name" } }),
        role: fields.text({ label: "Position" }),
        organization: fields.text({ label: "Organization" }),
        relationship: fields.text({ label: "Context / Relationship" }),
        content: fields.text({ label: "Endorsement Quote", multiline: true }),
      },
    }),
  },
  singletons: {
    now: singleton({
      label: "/now Status",
      path: "content/data/now",
      format: { data: "json" },
      schema: {
        updatedDate: fields.text({ label: "Date Tag (e.g. November 2026)" }),
        building: fields.array(fields.text({ label: "Item" }), {
          label: "What I'm Building",
          itemLabel: (props) => props.value,
        }),
        learning: fields.array(fields.text({ label: "Item" }), {
          label: "What I'm Learning & Exploring",
          itemLabel: (props) => props.value,
        }),
        goals: fields.text({ label: "Current Focus & Goals", multiline: true }),
      },
    }),
  },
});
