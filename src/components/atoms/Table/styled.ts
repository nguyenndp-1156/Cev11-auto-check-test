import { css } from '@emotion/react';
import styled from '@emotion/styled';

import colors from '@/ui/colors';
import fontWeights from '@/ui/fontWeights';

interface SizeProps {
  width: string;
  height: string;
  size?: string;
}

export const TableWrapper = styled.div<SizeProps>`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  max-height: ${({ height }) => (height ? `${height}px` : 'auto')};
  overflow: auto;

  ${({ size, height }) =>
    size === 'small' &&
    css`
      width: 100%;
      background: transparent;

      ${Table} {
        thead {
          display: table;
          width: calc(100% - 17px);

          th {
            border-bottom: 0;
            background: transparent;
            font-weight: ${fontWeights.bold};
            font-size: 1.4rem;
          }
        }

        tbody {
          display: block;
          max-height: ${height ? `${height}px` : 'unset'};
          overflow-y: scroll;

          tr {
            display: table;
            width: 100%;

            &:nth-child(even) {
              td {
                background: ${colors.white};
              }
            }
          }

          td {
            height: 49px;
            font-size: 15px;

            &:last-child {
              max-width: initial;
            }
          }
        }
      }
    `}
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  tbody tr:nth-child(even) {
    td {
      background: ${colors.gray['dark6']};
    }
  }
`;

export const ThTitle = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

export const CopyIconWrapper = styled.div``;

export const Sortable = styled.div`
  margin-left: 12px;
`;

export const SortIcon = styled.div<{
  isSorted?: boolean;
  isDecrease?: boolean;
}>`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 7px solid ${colors.black};
  cursor: pointer;
  transition: all 0.3s;

  border-bottom-color: ${({ isSorted }) => isSorted && colors.primary};

  transform: ${({ isDecrease }) => isDecrease && `rotateX(180deg)`};
  margin-top: ${({ isDecrease }) => isDecrease && `4px`};
`;

export const Th = styled.th<{
  width?: string | number;
  height: string | number;
  fixedColumn?: boolean;
  fixedHeader?: boolean;
}>`
  padding: 7.5px 20px;
  border-bottom: 1px solid ${colors.black};
  font-weight: ${fontWeights.bold};
  font-size: 1.4rem;
  white-space: nowrap;
  height: 52px;

  &:first-child {
    padding-left: 8px;
  }

  vertical-align: middle;
  background: ${colors.white};

  position: ${({ fixedColumn }) => (fixedColumn ? `sticky` : '')};
  z-index: 1;

  ${({ fixedHeader, fixedColumn }) =>
    fixedHeader &&
    css`
      position: sticky;
      top: 0;
      z-index: ${fixedColumn ? 3 : 2};
    `}

  ${({ width }) =>
    width &&
    css`
      max-width: ${width}px;
      min-width: ${width}px;
    `}
`;

export const Td = styled.td<{
  selected: boolean;
  lineBreak: boolean;
  fixedColumn?: boolean;
  fixedHeader?: boolean;
}>`
  padding: 4px 20px;
  height: 56px;
  border-bottom: 1px solid ${colors.secondary};
  font-size: 1.4rem;
  font-weight: ${fontWeights.bold};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: all 0.4s;

  &:first-child {
    padding-left: 8px;
  }

  vertical-align: middle;
  background: ${colors.white};

  position: ${({ fixedColumn }) => (fixedColumn ? `sticky` : '')};
  z-index: 1;

  ${({ fixedHeader, fixedColumn }) =>
    fixedHeader &&
    css`
      position: sticky;
      top: 0;
      z-index: ${fixedColumn ? 3 : 2};
    `}

  ${({ width }) =>
    width &&
    css`
      max-width: ${width}px;
      min-width: ${width}px;
    `}

  ${({ selected }) =>
    selected &&
    css`
      background: ${colors.primarš} !important;
    `}

  ${({ lineBreak }) =>
    lineBreak &&
    css`
      overflow: auto;
      white-space: pre-line;
      word-break: break-all;
      text-overflow: initial;
    `}
`;

export const SelectionWrapper = styled.div`
  display: inline-block;
  min-width: 30px;
  vertical-align: middle;
`;

export const ResizeHandle = styled.div<{ height: string; active: boolean }>`
  display: block;
  position: absolute;
  cursor: col-resize;
  width: 4px;
  right: 0;
  top: 0;
  z-index: 1;
  border-right: 2px solid transparent;
  height: ${({ height }) => (height === 'auto' ? 'auto' : `${height}px`)};

  &:hover {
    border-color: ${colors.primary};
  }

  ${({ active }) =>
    active &&
    css`
      border-color: ${colors.primary};
    `}
`;
