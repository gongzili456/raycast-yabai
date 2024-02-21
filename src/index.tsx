import { ActionPanel, Color, Icon, List } from "@raycast/api";
import { useExec } from "@raycast/utils";
import { groupBy } from "lodash";
import { cpus } from "os";
import { useMemo } from "react";
export interface Window {
  id: number,
  pid: number,
  app: string,
  title: string,
  role: string,
  subrole: string,
  display: number,
  space: number,
  level: number,
  layer: string,
  opacity: number,
}

export interface Space {
  id: number,
  uuid: string,
  index: number,
  label: string,
  type: string,
  display: number,
  "has-focus": boolean,
  windows: number[],
  Windows: Window[],
}

export default function Command() {
  const yabaiPath = cpus()[0].model.includes("Apple") ? "/opt/homebrew/bin/yabai" : "/usr/local/bin/yabai";
  const { isLoading, data: spacesString, error: spacesErr } = useExec(yabaiPath, ["-m", "query", "--spaces"], {
    env: {
      'USER': 'rory',
    },
  });
  if (spacesErr) {
    console.error('spacesErr: ', spacesErr);
    return
  }


  const spaces = useMemo<Space[]>(() => JSON.parse(spacesString || "[]") || [], [spacesString]);


  const { data: windowsString, error: windowsErr } = useExec(yabaiPath, ["-m", "query", "--windows"], {
    env: {
      'USER': 'rory',
    },
  });
  if (windowsErr) {
    console.error('windowsErr: ', windowsErr);
    return
  }

  const windows = useMemo<Window[]>(() => JSON.parse(windowsString || "[]") || [], [windowsString]);

  const windowsGroupo = groupBy(windows, 'space')

  for (const s of spaces) {
    s.Windows = windowsGroupo[s.index] || []
  }

  return (
    <List
      isLoading={isLoading}
    >
      {spaces.map((space) => itemRender(space))}
    </List>
  );
}

function itemRender(space: Space) {
  return (
    <List.Item
      key={space.id}
      icon={{ value: { source: ensureNumberIcon(space.index), tintColor: space["has-focus"] ? Color.Green : Color.SecondaryText }, tooltip: "" }}
      title={space.label}
      subtitle={space.type}
      accessories={space.Windows.map((w) => {
        return {
          tag: {
            value: w.app,
            color: space["has-focus"] ? Color.Green : Color.SecondaryText,
          }
        }
      })}
      actions={
        <ActionPanel>
        </ActionPanel>
      }
    />
  );
}

function ensureNumberIcon(id: number) {
  if (id === 1) {
    return Icon.Number01;
  }
  if (id === 2) {
    return Icon.Number02;
  }
  if (id === 3) {
    return Icon.Number03;
  }
  if (id === 4) {
    return Icon.Number04;
  }
  if (id === 5) {
    return Icon.Number05;
  }
  if (id === 6) {
    return Icon.Number06;
  }
  if (id === 7) {
    return Icon.Number07;
  }
  if (id === 8) {
    return Icon.Number08;
  }
  if (id === 9) {
    return Icon.Number09;
  }
  if (id === 10) {
    return Icon.Number10;
  }
  if (id === 11) {
    return Icon.Number11;
  }
  if (id === 12) {
    return Icon.Number12;
  }
  if (id === 13) {
    return Icon.Number13;
  }
  if (id === 14) {
    return Icon.Number14;
  }
  if (id === 15) {
    return Icon.Number15;
  }

  return Icon.Number00;
}