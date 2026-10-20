import type { ComponentType } from "react";
import { SINGLE_FLOOR, singleArtifacts, singleCamera } from "../singles";
import { serviceArtifacts, serviceCamera } from "../services";
import { createElement } from "react";
import { AnalyticsBoard } from "./AnalyticsBoard";
import { Billboard } from "./Billboard";
import { Camcorder } from "./Camcorder";
import { Clapperboard } from "./Clapperboard";
import { ContentFactory } from "./ContentFactory";
import { FilmStrip } from "./FilmStrip";
import { GiftBox } from "./GiftBox";
import { GoogleCluster } from "./GoogleCluster";
import { GrowthRunner } from "./GrowthRunner";
import { MeetingTable } from "./MeetingTable";
import { PenNib } from "./PenNib";
import { PressMic } from "./PressMic";
import { InstagramTile } from "./socials/InstagramTile";
import { FacebookTile } from "./socials/FacebookTile";
import { YouTubeTile } from "./socials/YouTubeTile";
import { XTile } from "./socials/XTile";
import { TikTokTile } from "./socials/TikTokTile";
import { LinkedInTile } from "./socials/LinkedInTile";
import { WhatsAppTile } from "./socials/WhatsAppTile";
import { WebShop } from "./WebShop";

/**
 * Every artifact, with the reference it is matched against and the camera that reproduces the
 * reference's framing (yaw/pitch in degrees around the target, then distance and field of view).
 */
export type ArtifactEntry = {
  id: string;
  name: string;
  Component: ComponentType;
  /** Reference picture in public/lab/refs/, if there is one. */
  ref?: string;
  camera: { yaw: number; pitch: number; distance: number; fov: number; target?: [number, number, number] };
};

/** The twelve service artifacts first, then the single artifacts. */
const serviceEntries: ArtifactEntry[] = Object.entries(serviceArtifacts).map(([id, a]) => ({ id: `svc-${id}`, name: a.name, Component: a.Component, ref: `ref-svc-${id}.png`, camera: serviceCamera }));

/** Single objects from the marketing-hub reference, each dropped onto the shadow plane. */
const singleEntries: ArtifactEntry[] = Object.entries(singleArtifacts).map(([id, a]) => {
  const Floored = () => createElement("group", { position: [0, SINGLE_FLOOR, 0] }, createElement(a.Component));
  return { id: `single-${id}`, name: a.name, Component: Floored, ref: `ref-single-${id}.png`, camera: singleCamera };
});

export const artifacts: ArtifactEntry[] = [
  ...serviceEntries,
  ...singleEntries,
  { id: "content-factory", name: "Content factory (home)", Component: ContentFactory, ref: "ref-content-factory.png", camera: { yaw: 45, pitch: 30, distance: 13, fov: 30, target: [-0.1, -0.1, 0.8] } },
  { id: "social-instagram", name: "Instagram", Component: InstagramTile, ref: "ref-socials-cluster.jpg", camera: { yaw: 22, pitch: 14, distance: 2.6, fov: 34, target: [0, 0, 0] } },
  { id: "social-facebook", name: "Facebook", Component: FacebookTile, ref: "ref-socials-cluster.jpg", camera: { yaw: 22, pitch: 14, distance: 2.6, fov: 34, target: [0, 0, 0] } },
  { id: "social-youtube", name: "YouTube", Component: YouTubeTile, ref: "ref-socials-cluster.jpg", camera: { yaw: 22, pitch: 14, distance: 2.6, fov: 34, target: [0, 0, 0] } },
  { id: "social-twitter", name: "X", Component: XTile, ref: "ref-socials-cluster.jpg", camera: { yaw: 22, pitch: 14, distance: 2.6, fov: 34, target: [0, 0, 0] } },
  { id: "social-tiktok", name: "TikTok", Component: TikTokTile, ref: "ref-socials-cluster.jpg", camera: { yaw: 22, pitch: 14, distance: 2.6, fov: 34, target: [0, 0, 0] } },
  { id: "social-linkedin", name: "LinkedIn", Component: LinkedInTile, ref: "ref-socials-cluster.jpg", camera: { yaw: 22, pitch: 14, distance: 2.6, fov: 34, target: [0, 0, 0] } },
  { id: "social-whatsapp", name: "WhatsApp", Component: WhatsAppTile, ref: "ref-socials-cluster.jpg", camera: { yaw: 22, pitch: 14, distance: 2.6, fov: 34, target: [0, 0, 0] } },
  { id: "growth-runner", name: "Growth runner", Component: GrowthRunner, ref: "ref-growth-runner.png", camera: { yaw: 18, pitch: 16, distance: 5.3, fov: 34, target: [0.1, 0.1, 0] } },
  { id: "meeting-table", name: "Meeting table", Component: MeetingTable, ref: "ref-meeting-table.png", camera: { yaw: -8, pitch: 22, distance: 5.6, fov: 34, target: [0, 0.25, 0] } },
  { id: "clapperboard", name: "Clapperboard", Component: Clapperboard, ref: "ref-clapperboard.jpg", camera: { yaw: 26, pitch: 14, distance: 5.0, fov: 34, target: [0, 0.1, 0] } },
  { id: "camcorder", name: "Camcorder", Component: Camcorder, ref: "ref-camcorder.png", camera: { yaw: -42, pitch: 14, distance: 4.1, fov: 34, target: [0, 0.05, 0] } },
  { id: "web-shop", name: "Web shop", Component: WebShop, ref: "ref-web-shop.png", camera: { yaw: 22, pitch: 8, distance: 5.0, fov: 34, target: [0.15, -0.1, 0] } },
  { id: "analytics-board", name: "Analytics board", Component: AnalyticsBoard, ref: "ref-analytics-board.png", camera: { yaw: 18, pitch: 12, distance: 4.3, fov: 34, target: [0, -0.05, 0] } },
  { id: "film-strip", name: "Film reel", Component: FilmStrip, ref: "ref-film-reel.png", camera: { yaw: 0, pitch: 2, distance: 6.6, fov: 34, target: [0, 0.1, 0] } },
  { id: "google-cluster", name: "Google cluster", Component: GoogleCluster, ref: "ref-google-cluster.png", camera: { yaw: 0, pitch: 8, distance: 5.6, fov: 34, target: [0, 0.05, 0] } },
  { id: "press-mic", name: "Press microphone (new)", Component: PressMic, camera: { yaw: 24, pitch: 12, distance: 4.6, fov: 34, target: [0.15, -0.08, 0] } },
  { id: "gift-box", name: "Gift box (new)", Component: GiftBox, camera: { yaw: 18, pitch: 14, distance: 4.6, fov: 34, target: [0.1, -0.1, 0] } },
  { id: "pen-nib", name: "Pen nib and swatches (new)", Component: PenNib, camera: { yaw: 10, pitch: 8, distance: 5.6, fov: 34, target: [0, 0.15, 0] } },
  { id: "billboard", name: "Billboard (new)", Component: Billboard, camera: { yaw: 22, pitch: 8, distance: 5.4, fov: 34, target: [0, -0.15, 0] } },
];

export const artifactById = Object.fromEntries(artifacts.map((a) => [a.id, a]));
