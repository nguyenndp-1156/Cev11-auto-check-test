import Head from 'next/head';
import { zodResolver } from '@hookform/resolvers/zod';
import _flatten from 'lodash/flatten';
import _isArray from 'lodash/isArray';
import _isEqual from 'lodash/isEqual';

import React, { useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Box, Stack, Table, Tbody, Td, Text, Tr } from '@chakra-ui/react';

import Button from '@/components/atoms/Button';
import FieldItem from '@/components/atoms/FieldItem';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import { DefaultLayout } from '@/components/templates/DefaultLayout';
import {
  COMPARE_UNIT,
  DEFAULT_VALUE,
  messages,
  OPTION_COMPARE_CONDITION,
  OPTIONS_LIST_DOMAIN,
} from '@/constants';
import { createCheckEstimate } from '@/services/home';
import { NextPageWithLayout } from '@/types/layouts';
import { schema } from '@/utils/validations/pages/home';

const HomePage: NextPageWithLayout = () => {
  const [conditionValueList, setConditionValueList] = useState<
    {
      id?: number;
      firstDomain?: string;
      compareCondition?: string;
      compareNumber?: number;
      compareUnit?: string;
      secondDomain?: string;
    }[]
  >(DEFAULT_VALUE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageTable, setMessageTable] = useState<{
    message: string;
    data: any;
  }>({
    message: '',
    data: [],
  });

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<{
    linkFile: string;
    firstDomain?: string;
    compareCondition?: string;
    compareNumber?: number;
    compareUnit?: string;
    secondDomain?: string;
  }>({
    defaultValues: {
      linkFile: '',
      firstDomain: '',
      compareCondition: '',
      compareNumber: 0,
      compareUnit: '',
      secondDomain: '',
    },
    mode: 'all',
    resolver: zodResolver(schema),
  });

  const isRowSameValue = () => {
    return conditionValueList?.map((row) => {
      const errRow: any = [];
      const cloneRow = { ...row };

      delete cloneRow.id;
      delete cloneRow.compareNumber;

      if (Object.values(cloneRow)?.filter((item) => item !== '')?.length > 0) {
        if (
          Object.values(cloneRow)?.filter((item) => item !== '')?.length !== 4
        ) {
          errRow.push(row);
        }
      }

      return errRow;
    });
  };

  const checkDuplicateDomain = useMemo(() => {
    return conditionValueList
      ?.map((row) => {
        if (
          row['firstDomain'] !== '' &&
          row['secondDomain'] !== '' &&
          row['firstDomain'] === row['secondDomain']
        ) {
          return row;
        }
      })
      .filter((item) => item !== undefined);
  }, [conditionValueList]);

  const duplicates =
    conditionValueList?.length >= 2 &&
    conditionValueList.filter((row, index) => {
      if (Object.values(row)?.filter((item) => item !== '')?.length > 2) {
        return (
          Number(row?.id) >= 0 &&
          conditionValueList.some((elem, idx) => {
            const cloneElem = { ...elem };
            const cloneRow = { ...row };
            const {
              compareUnit: unitFirst,
              firstDomain: firstDomainElem,
              secondDomain: secondDomainElem,
            } = elem;
            const {
              compareUnit: unitSecond,
              firstDomain: firstDomainRow,
              secondDomain: secondDomainRow,
            } = row;
            delete cloneElem?.id;
            delete cloneRow?.id;

            return (
              !_isEqual(cloneElem, cloneRow) &&
              _isEqual(unitFirst, unitSecond) &&
              _isEqual(firstDomainElem, firstDomainRow) &&
              _isEqual(secondDomainElem, secondDomainRow) &&
              idx !== index
            );
          })
        );
      }
    });

  const handleAddLine = () => {
    const newLine = {
      id: conditionValueList?.length,
      firstDomain: '',
      compareCondition: '',
      compareNumber: 0,
      compareUnit: '',
      secondDomain: '',
    };

    if (_flatten(isRowSameValue())?.length) {
      setMessageTable({
        message: messages.REQUIRED_DATA(),
        data: _flatten(isRowSameValue()),
      });
    } else if (_isArray(duplicates) && duplicates?.length) {
      setMessageTable({ message: messages.DUPLICATE_ROW(), data: duplicates });
    } else if (checkDuplicateDomain?.length) {
      setMessageTable({
        message: messages?.DUPLICATE_DOMAIN(),
        data: checkDuplicateDomain,
      });
    } else {
      setMessageTable({
        message: '',
        data: [],
      });

      setConditionValueList([...conditionValueList, newLine]);
    }
  };

  const handleChangeRow = useCallback(
    (index: number, field, e) => {
      const { value } = e.target;
      const rows = [...conditionValueList];

      rows[index][field?.name] = value;

      setConditionValueList(rows);
    },
    [conditionValueList],
  );

  const handleSubmitLinkFile = async () => {
    setIsLoading(true);

    try {
      const { linkFile } = getValues();

      const formatLinkFile: any = linkFile.match(/\/d\/(.+)\//);

      const formatInformationCompare = conditionValueList
        ?.filter((value) => {
          const newValue = { ...value };
          return !_isEqual(
            {
              firstDomain: '',
              compareCondition: '',
              compareNumber: 0,
              compareUnit: '',
              secondDomain: '',
            },
            newValue,
          );
        })
        ?.map((filterItem) => {
          return {
            domainLeft: filterItem?.firstDomain,
            domainRight: filterItem?.secondDomain,
            unit: filterItem?.compareUnit,
            fomular: filterItem?.compareCondition,
            ratio: filterItem?.compareNumber,
          };
        });

      const data = {
        spreadSheetId: formatLinkFile[1],
        informationCompare: formatInformationCompare,
      };

      if (_flatten(isRowSameValue())?.length) {
        setMessageTable({
          message: messages.REQUIRED_DATA(),
          data: _flatten(isRowSameValue()),
        });
      } else if (_isArray(duplicates) && duplicates?.length) {
        setMessageTable({
          message: messages.DUPLICATE_ROW(),
          data: duplicates,
        });
      } else if (checkDuplicateDomain?.length) {
        setMessageTable({
          message: messages?.DUPLICATE_DOMAIN(),
          data: checkDuplicateDomain,
        });
      } else {
        setMessageTable({
          message: '',
          data: [],
        });
        await createCheckEstimate(data);
      }
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRow = useCallback(
    (id: number) => {
      if (conditionValueList?.length > 1) {
        const list = conditionValueList.filter((row) => {
          return row.id !== id;
        });

        setConditionValueList(list);
      }
    },
    [conditionValueList],
  );

  const renderTableData = () => {
    return conditionValueList?.map((item, index) => (
      <Tr key={`${item}-${item?.id}`} display="flex" flexDirection="column">
        <Box>
          <Td border="none" pl="0" pr="10px">
            <Controller
              name="firstDomain"
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    defaultValue={item?.firstDomain}
                    options={OPTIONS_LIST_DOMAIN}
                    onChange={(e) => handleChangeRow(index, field, e)}
                  />
                );
              }}
            />
          </Td>

          <Td border="none" pl="0" pr="10px">
            <Controller
              name="compareCondition"
              control={control}
              render={({ field }) => (
                <Select
                  defaultValue={item?.compareCondition}
                  options={OPTION_COMPARE_CONDITION}
                  onChange={(e) => handleChangeRow(index, field, e)}
                />
              )}
            />
          </Td>

          <Td border="none" pl="0" pr="10px">
            <Controller
              control={control}
              name="compareNumber"
              render={({ field }) => (
                <Input
                  pr="0"
                  pl="0"
                  textAlign="center"
                  w="40px"
                  type="number"
                  defaultValue={item?.compareNumber}
                  onChange={(e) => handleChangeRow(index, field, e)}
                />
              )}
            />
          </Td>

          <Td border="none" pl="0" pr="10px">
            <Controller
              control={control}
              name="compareUnit"
              render={({ field }) => (
                <Select
                  defaultValue={item?.compareUnit}
                  w="100px"
                  options={COMPARE_UNIT}
                  onChange={(e) => handleChangeRow(index, field, e)}
                />
              )}
            />
          </Td>

          <Td border="none" pl="0" pr="10px">
            <Controller
              name="secondDomain"
              control={control}
              render={({ field }) => (
                <Select
                  defaultValue={item?.secondDomain}
                  options={OPTIONS_LIST_DOMAIN}
                  onChange={(e) => handleChangeRow(index, field, e)}
                />
              )}
            />
          </Td>

          <Td border="none" px="0" pr="10px">
            <Button
              h="40px"
              w="100px"
              fontSize="1.6rem"
              background="red"
              fontWeight="medium"
              borderRadius="5px"
              onClick={() => handleDeleteRow(Number(item?.id))}
            >
              Delete
            </Button>
          </Td>
        </Box>

        {messageTable?.data?.findIndex((row) => Number(row?.id) === index) >=
          0 && (
          <Text color="error" fontSize="1.4rem" pl="15px">
            {messageTable?.message}
          </Text>
        )}
      </Tr>
    ));
  };

  return (
    <>
      <Head>
        <title>CEV11 Auto check est tool</title>
      </Head>

      <Box as="section" w="100%" mt="20px">
        <Box
          background="white"
          p={{ sm: '10px 15px', md: '20px 25px' }}
          borderRadius="10px"
          boxShadow="0 0 5px 0px rgba(140,134,134,0.75);"
          as="form"
          noValidate
          onSubmit={handleSubmit(handleSubmitLinkFile)}
        >
          <Stack gap="20px">
            <FieldItem
              label="Please input estimation file URL"
              isRequired
              error={errors.linkFile?.message}
            >
              <Input
                fontSize="1.6rem"
                placeholder="Please input your link"
                {...register('linkFile')}
              />
            </FieldItem>

            <Box>
              <Text fontSize="1.6rem" mb="5px" fontWeight="bold">
                Setting verification condition
              </Text>
              <Text fontSize="1.4rem">
                Please input the trigger point that you want to verify
              </Text>

              <Stack flexDirection="row">
                <Table>
                  <FieldItem>
                    <Tbody>{renderTableData()}</Tbody>
                  </FieldItem>
                </Table>

                <Box mt="12px">
                  <Button
                    h="40px"
                    w="100px"
                    fontSize="1.6rem"
                    backgroundColor="blue.light"
                    fontWeight="medium"
                    borderRadius="5px"
                    onClick={handleAddLine}
                  >
                    Add More +
                  </Button>
                </Box>
              </Stack>
            </Box>

            <Button
              type="submit"
              variant="solid"
              w="285px"
              height="48px"
              mx="auto"
              fontSize="1.6rem"
              fontWeight="medium"
              backgroundColor="blue.light"
              transition="all 0.5s"
              _hover={{
                backgroundColor: 'blue.blue1',
              }}
              isLoading={isLoading}
            >
              Check estimation result
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

HomePage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default HomePage;
