"use client";
import React from "react";
import registry, { ModuleComponentProps } from "./registry";

type LayoutItem = {
  module: { _id: string; type: string; content?: any; [k: string]: any };
};

export default function ModuleRenderer({
  item,
  index,
}: {
  item: LayoutItem;
  index: number;
}) {
  const type = (item.module?.type || "").toLowerCase();

  const Component = registry[type];

  if (!Component) {
    return (
      <div className="bg-red-50 border border-red-100 rounded p-4 text-sm text-red-700">
        Unknown module type: <strong>{type}</strong>
        <pre className="mt-2 text-xs bg-white p-2 rounded">
          {JSON.stringify(item.module, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <Component
      data={item.module.content || {}}
      key={item.module._id || index}
    />
  );
}
