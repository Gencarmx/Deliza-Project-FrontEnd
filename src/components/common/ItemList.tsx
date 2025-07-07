"use client";

import { ReactNode } from "react";
import { HiChevronRight } from "react-icons/hi";
import Link from "next/link";

type InfoItem = {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  showArrow?: boolean;
  href?: string;
};

type InfoItemListProps = {
  items: InfoItem[];
};

export default function InfoItemList({ items }: InfoItemListProps) {
  return (
    <div className="bg-[#f4f4f4] rounded-xl p-4 space-y-2">
      {items.map((item, index) => {
        const content = (
          <div
            className="flex items-center justify-between p-3 rounded-lg hover:bg-[#e0dbd1] transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
                {item.icon}
              </div>
              <div>
                <div className="text-sm font-semibold uppercase text-gray-700">
                  {item.title}
                </div>
                {item.subtitle && (
                  <div className="text-sm text-gray-600">{item.subtitle}</div>
                )}
              </div>
            </div>
            {item.showArrow && (
              <HiChevronRight className="text-gray-400 text-xl" />
            )}
          </div>
        );

        return item.href ? (
          <Link href={item.href} key={index}>
            {content}
          </Link>
        ) : (
          <div key={index}>{content}</div>
        );
      })}
    </div>
  );
}
