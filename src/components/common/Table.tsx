import React from 'react';

export interface Column<T> {
  header: string;
  accessor?: keyof T | ((row: T) => React.ReactNode);
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyText?: string;
  isLoading?: boolean;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  emptyText = 'No records available in this view',
  isLoading = false,
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-[8px] border border-[#D9DEE3] overflow-hidden p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-7 w-7 border-2 border-[#0A66C2] border-t-transparent mb-2" />
        <p className="text-[13px] font-medium text-[#5E6670]">Loading records...</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden bg-white rounded-[8px] border border-[#D9DEE3] shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#D9DEE3] text-left">
          <thead className="bg-[#F8FAFB]">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  scope="col"
                  className={`px-4 py-3 text-[11px] font-semibold text-[#5E6670] uppercase tracking-wider ${
                    col.align === 'right'
                      ? 'text-right'
                      : col.align === 'center'
                      ? 'text-center'
                      : 'text-left'
                  } ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#D9DEE3] bg-white">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-[13px] text-[#5E6670]">
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={keyExtractor(row)}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`transition-colors duration-100 ${
                    onRowClick ? 'cursor-pointer hover:bg-[#F8FAFB]' : 'hover:bg-[#F8FAFB]'
                  }`}
                >
                  {columns.map((col, colIdx) => {
                    let cellContent: React.ReactNode;
                    if (typeof col.accessor === 'function') {
                      cellContent = col.accessor(row);
                    } else if (col.accessor) {
                      cellContent = row[col.accessor] as unknown as React.ReactNode;
                    } else {
                      cellContent = null;
                    }

                    return (
                      <td
                        key={colIdx}
                        className={`px-4 py-3 text-[13px] text-[#1D2226] whitespace-nowrap ${
                          col.align === 'right'
                            ? 'text-right'
                            : col.align === 'center'
                            ? 'text-center'
                            : 'text-left'
                        } ${col.className || ''}`}
                      >
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

