import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import MissionList from "./components/MissionList";
import MissionDetails from "./components/MissionDetails";
import { vi } from "vitest";

const mockMissions = [
  {
    id: "5eb87cd9ffd86e000604b32a",
    name: "FalconSat",
    success: false,
    date_utc: "2006-03-24T22:30:00.000Z",
    links: { 
      patch: { small: "", large: "" }, 
      wikipedia: "https://en.wikipedia.org/wiki/DemoSat", 
      webcast: "https://www.youtube.com/watch?v=0a_00nJ_Y88" 
    },
    rocket: "5e9d0d95eda69955f709d1eb",
    details: "Engine failure at 33 seconds",
  },
  {
    id: "5eb87cdaffd86e000604b32b",
    name: "DemoSat",
    success: true,
    date_utc: "2007-03-21T01:10:00.000Z",
    links: { 
      patch: { small: "", large: "" }, 
      wikipedia: "https://en.wikipedia.org/wiki/DemoSat", 
      webcast: "https://www.youtube.com/watch?v=Lk4zQ2wP-Nc" 
    },
    rocket: "5e9d0d95eda69955f709d1eb",
    details: "Premature engine shutdown",
  },
];

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockMissions),
  } as Response)
);

describe("MissionList Component", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test("renders the mission list and filters by success", async () => {
    const user = userEvent.setup();
    
    render(
      <MemoryRouter>
        <MissionList />
      </MemoryRouter>
    );

    const falcon = await screen.findByText("FalconSat");
    const demo = await screen.findByText("DemoSat");
    expect(falcon).toBeInTheDocument();
    expect(demo).toBeInTheDocument();

    const successCheckbox = screen.getByLabelText(/Success Only/i);
    await user.click(successCheckbox);

    await waitFor(() => {
      expect(screen.queryByText("FalconSat")).not.toBeInTheDocument();
    });
    
    expect(screen.getByText("DemoSat")).toBeInTheDocument();
  });

  test("renders detail view when a mission is clicked", async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/atmosly/5eb87cd9ffd86e000604b32a", state: mockMissions[0] }]}>
        <Routes>
          <Route path="/atmosly/:id" element={<MissionDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const nameEl = await screen.findByText("FalconSat");
    expect(nameEl).toBeInTheDocument();
    expect(screen.getByText("Engine failure at 33 seconds")).toBeInTheDocument();
    expect(screen.getByText("5e9d0d95eda69955f709d1eb")).toBeInTheDocument();
  });

  test("favourites toggle and persistence in MissionDetails", async () => {
    const user = userEvent.setup();
    
    render(
      <MemoryRouter initialEntries={[{ pathname: "/atmosly/5eb87cdaffd86e000604b32b", state: mockMissions[1] }]}>
        <Routes>
          <Route path="/atmosly/:id" element={<MissionDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const favBtn = await screen.findByTestId("fav-5eb87cdaffd86e000604b32b");
    expect(favBtn).toHaveTextContent("Add to favourites");

    await user.click(favBtn);
    
    await waitFor(() => {
      expect(favBtn).toHaveTextContent("Remove from favourites");
    });

    const favs = JSON.parse(localStorage.getItem("favourites") || "[]");
    expect(favs).toContain("5eb87cdaffd86e000604b32b");

    await user.click(favBtn);
    
    await waitFor(() => {
      expect(favBtn).toHaveTextContent("Add to favourites");
    });
    
    const favsAfter = JSON.parse(localStorage.getItem("favourites") || "[]");
    expect(favsAfter).not.toContain("5eb87cdaffd86e000604b32b");
  });
});