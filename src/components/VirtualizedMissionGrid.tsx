import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import type { MissionItemType } from "../types/MissionItemType";
import MissionItem from "./MissionItem";

type VirtualGridProps = {
  items: MissionItemType[];
  columnWidth?: number;
  rowHeight?: number;
};

const VirtualMissionGrid = ({ items, columnWidth = 280, rowHeight = 180 }: VirtualGridProps) => {
  return (
    <div style={{ width: "100%", height: "80vh" }}>
      <AutoSizer>
        {({ width, height }) => {
          const columnCount = Math.max(1, Math.floor(width / columnWidth));
          const rowCount = Math.ceil(items.length / columnCount);

          return (
            <Grid
              columnCount={columnCount}
              columnWidth={columnWidth}
              height={height}
              rowCount={rowCount}
              rowHeight={rowHeight}
              width={width}
            >
              {({ columnIndex, rowIndex, style }) => {
                const index = rowIndex * columnCount + columnIndex;
                if (index >= items.length) return null;

                const mission = items[index];
                return (
                  <div style={style} className="p-2">
                    <MissionItem {...mission} />
                  </div>
                );
              }}
            </Grid>
          );
        }}
      </AutoSizer>
    </div>
  );
};

export default VirtualMissionGrid;
