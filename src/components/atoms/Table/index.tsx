import _map from 'lodash/map';
import _uniqueId from 'lodash/uniqueId';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import * as S from './styled';

const createHeaders = (cols) =>
  cols.map((item) => ({
    ...item,
    ref: useRef(),
  }));

interface TableProps {
  columns: {
    title: string;
    key: string;
    fixed: boolean;
    width: number;
    maxLength: string;
    render: () => any;
  }[];
  dataSource: [];
  width: string;
  height: string;
  size: string;
  rowSelection: {
    selectedRowKeys: any;
    onChange: any;
  };
  fixedHeader: boolean;
  style: any;
  sortInfo: {
    key: string;
    isDescending: boolean;
    isSorting: boolean;
    sortDirection: string;
  };
  colLineBreak: boolean;
  hideSelectedAll: boolean;
  customTableHead: any;
}

const Table = ({
  columns = [],
  dataSource = [],
  width,
  height,
  size,
  rowSelection,
  fixedHeader,
  style,
  sortInfo,
  colLineBreak = false,
  hideSelectedAll,
  customTableHead,
  ...rest
}: TableProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [tableHeight, setTableHeight] = useState('auto');
  const [activeIndex, setActiveIndex] = useState(null);
  const tableElement = useRef<any>(null);
  const headers = createHeaders(columns);

  useEffect(() => {
    if (rowSelection?.selectedRowKeys) {
      setSelectedRowKeys([...rowSelection.selectedRowKeys]);
    }
  }, [rowSelection?.selectedRowKeys]);

  useEffect(() => {
    setTableHeight(tableElement?.current?.offsetHeight);
  }, [tableElement]);

  const mouseDown = (index) => {
    setActiveIndex(index);
  };

  const mouseMove = useCallback(
    (e) => {
      headers.forEach((col, i) => {
        if (i === activeIndex) {
          const posMouse = e.clientX + tableElement.current.scrollLeft;
          const widthCol = posMouse - col.ref.current.offsetLeft;
          if (widthCol >= col.width) {
            // eslint-disable-next-line no-param-reassign
            col.ref.current.style.minWidth = `${widthCol}px`;
          }
        }
      });
    },
    [activeIndex, columns],
  );

  const removeListeners = useCallback(() => {
    tableElement?.current?.removeEventListener('mousemove', mouseMove);
    tableElement?.current?.removeEventListener('mouseup', removeListeners);
  }, [mouseMove]);

  const mouseUp = useCallback(() => {
    setActiveIndex(null);
    removeListeners();
  }, [setActiveIndex, removeListeners]);

  useEffect(() => {
    if (activeIndex !== null) {
      tableElement?.current?.addEventListener('mousemove', mouseMove);
      tableElement?.current?.addEventListener('mouseup', mouseUp);
    }

    return () => {
      removeListeners();
    };
  }, [activeIndex, mouseMove, mouseUp, removeListeners]);

  const renderTableHead = useMemo(() => {
    let fixedPosition = 0;
    let prevFixedWidth = 0;

    return _map(headers, (columnItem, columnIndex) => {
      const hasSelection =
        !!rowSelection && Number(columnIndex) === 0 && !hideSelectedAll;
      if (columnItem.fixed) {
        if (prevFixedWidth !== 0) fixedPosition += prevFixedWidth;
        prevFixedWidth += (columnItem.width || 0) + (hasSelection ? 30 : 0);
      }

      if (columnItem?.hideColumn) return null;

      return (
        <S.Th
          key={`th-${columnIndex}`}
          fixedColumn={columnItem.fixed}
          fixedHeader={fixedHeader}
          {...(columnItem.width && {
            width: columnItem.width + (hasSelection ? 30 : 0),
          })}
          {...(columnItem.fixed && { style: { left: fixedPosition } })}
          ref={columnItem.ref}
        >
          <S.ThTitle>{columnItem.title}</S.ThTitle>
          {columnItem.resizable && (
            <S.ResizeHandle
              height={tableHeight}
              onMouseDown={() => mouseDown(columnIndex)}
              active={activeIndex === columnIndex}
            />
          )}
        </S.Th>
      );
    });
  }, [
    columns,
    rowSelection,
    selectedRowKeys,
    sortInfo,
    dataSource,
    tableHeight,
    activeIndex,
  ]);

  const renderItemBody = (
    columnItem: any,
    itemData: any,
    columnIndex: number,
  ) => {
    const eleWidth = headers[columnIndex].ref.current?.offsetWidth;

    if (
      columnItem.maxLength &&
      itemData[columnItem.key]?.toString()?.length > columnItem.maxLength &&
      eleWidth <= columns[columnIndex].width + columns[columnIndex].maxLength
    ) {
      return `${itemData[columnItem.key]
        ?.toString()
        .substring(0, columnItem.maxLength)}...`;
    }

    return itemData[columnItem.key];
  };

  const renderTableBody = useMemo(
    () =>
      dataSource.map((dataItem: any) => {
        let fixedPosition = 0;
        let prevFixedWidth = 0;
        return (
          <tr key={`tr-${_uniqueId()}`}>
            {_map(headers, (columnItem, columnIndex) => {
              const hasSelection = !!rowSelection && Number(columnIndex) === 0;

              if (columnItem.fixed) {
                if (prevFixedWidth !== 0) fixedPosition += prevFixedWidth;
                prevFixedWidth +=
                  (columnItem.width || 0) + (hasSelection ? 30 : 0);
              }

              if (columnItem?.hideColumn) return null;

              return (
                <S.Td
                  key={`td-${dataItem.id}-${columnItem.key}`}
                  fixedColumn={columnItem.fixed}
                  {...(columnItem.width && {
                    width: columnItem.width + (hasSelection ? 30 : 0),
                  })}
                  {...(columnItem.fixed && { style: { left: fixedPosition } })}
                  {...(!columnItem.render && {
                    title: dataItem[columnItem.key],
                  })}
                  selected={selectedRowKeys.includes(dataItem.id)}
                  lineBreak={colLineBreak}
                >
                  {columnItem.render
                    ? columnItem.render(dataItem)
                    : renderItemBody(columnItem, dataItem, Number(columnIndex))}
                </S.Td>
              );
            })}
          </tr>
        );
      }),
    [
      columns,
      dataSource,
      rowSelection,
      selectedRowKeys,
      sortInfo,
      renderItemBody,
    ],
  );

  if (!dataSource.length) return null;
  return (
    <S.TableWrapper
      width={width}
      height={height}
      size={size}
      style={style}
      {...rest}
      ref={tableElement}
    >
      <S.Table>
        {customTableHead ?? (
          <thead>
            <tr>{renderTableHead}</tr>
          </thead>
        )}
        <tbody>{renderTableBody}</tbody>
      </S.Table>
    </S.TableWrapper>
  );
};

export default Table;
