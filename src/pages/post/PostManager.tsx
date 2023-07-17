import {
  ActionIcon,
  Button,
  Card,
  Divider,
  FileInput,
  Grid,
  Group,
  Radio,
  rem,
  ScrollArea,
  Select,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { IconEdit, IconEye, IconPlus, IconTrash, IconUpload } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { PagedListResponse } from '@type/common/PagedListResponse';
import { ProvinceResponse } from '@type/address/Province';
import { ApiError } from '@type/common/ApiError';
import { resourcePath } from '@constant/resourcePath';
import ky from 'ky';
import { DataTable } from 'mantine-datatable';
import { dateUtils } from '@util/dateUtils';
import { useState } from 'react';
import { appConstants } from '@constant/appConstants';
import { modals } from '@mantine/modals';
import { Link, RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';

function PostManager() {
  const theme = useMantineTheme();

  const { data: response, isLoading } = useQuery<PagedListResponse<ProvinceResponse>, ApiError>({
    queryKey: [resourcePath.province],
    queryFn: () => ky.get(resourcePath.province).json(),
    refetchOnWindowFocus: false,
  });

  const [selectedRecords, setSelectedRecords] = useState<ProvinceResponse[]>([]);
  const [page, setPage] = useState(1);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
  });

  const handleCreateButton = () => {
    modals.open({
      title: <Text weight={500}>Thêm tin tức</Text>,
      size: '60rem',
      withCloseButton: false,
      closeOnClickOutside: false,
      scrollAreaComponent: ScrollArea.Autosize,
      styles: {
        header: {
          borderBottom: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
          }`,
        },
      },
      children: (
        <Stack mt="0.5rem">
          <Grid>
            <Grid.Col md={6}>
              <TextInput withAsterisk label="Tiêu đề" data-autofocus />
            </Grid.Col>
            <Grid.Col md={6}>
              <TextInput withAsterisk label="Slug" />
            </Grid.Col>
            <Grid.Col md={6}>
              <Radio.Group withAsterisk name="post-type" label="Loại tin tức" defaultValue="normal">
                <Group mt="xs">
                  <Radio value="normal" label="Tin thường" />
                  <Radio value="featured" label="Tin nổi bật" />
                </Group>
              </Radio.Group>
            </Grid.Col>
            <Grid.Col md={6}>
              <Select
                withAsterisk
                label="Chủ đề"
                defaultValue="1"
                withinPortal
                data={[
                  { value: '1', label: 'Chủ đề 1' },
                  { value: '2', label: 'Chủ đề 2' },
                  { value: '3', label: 'Chủ đề 3' },
                  { value: '4', label: 'Chủ đề 4' },
                ]}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <FileInput
                withAsterisk
                label="Hình đại diện vuông"
                description="Kích thước khoảng 575x575 (1:1)"
                placeholder="Chọn hình"
                icon={<IconUpload size="1.25rem" />}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <FileInput
                withAsterisk
                label="Hình đại diện dài"
                description="Kích thước khoảng 1200x800 (1.5:1)"
                placeholder="Chọn hình"
                icon={<IconUpload size="1.25rem" />}
              />
            </Grid.Col>
            <Grid.Col>
              <Stack spacing="0.125rem">
                <Text size="sm" weight={500}>
                  Nội dung
                  <Text span color="red.6" ml="0.25rem">
                    *
                  </Text>
                </Text>
                <RichTextEditor editor={editor}>
                  <RichTextEditor.Toolbar sticky stickyOffset={56}>
                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Bold />
                      <RichTextEditor.Italic />
                      <RichTextEditor.Underline />
                      <RichTextEditor.Strikethrough />
                      <RichTextEditor.ClearFormatting />
                      <RichTextEditor.Highlight />
                      <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.H1 />
                      <RichTextEditor.H2 />
                      <RichTextEditor.H3 />
                      <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Blockquote />
                      <RichTextEditor.Hr />
                      <RichTextEditor.BulletList />
                      <RichTextEditor.OrderedList />
                      <RichTextEditor.Subscript />
                      <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Link />
                      <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.AlignLeft />
                      <RichTextEditor.AlignCenter />
                      <RichTextEditor.AlignJustify />
                      <RichTextEditor.AlignRight />
                    </RichTextEditor.ControlsGroup>
                  </RichTextEditor.Toolbar>

                  <RichTextEditor.Content />
                </RichTextEditor>
              </Stack>
            </Grid.Col>
          </Grid>

          <Divider variant="dotted" />

          <Group position="right">
            <Button variant="default" onClick={() => modals.closeAll()}>
              Hủy
            </Button>
            <Button onClick={() => modals.closeAll()}>Thêm</Button>
          </Group>
        </Stack>
      ),
    });
  };

  return (
    <Stack mb="1.5rem">
      <Group position="apart">
        <Text size="xl" weight={500}>
          Quản lý tin tức
        </Text>
        <Group spacing="xs">
          <Button
            variant="outline"
            leftIcon={<IconPlus size="1rem" />}
            onClick={handleCreateButton}
          >
            Thêm mới
          </Button>
          <Button variant="outline" leftIcon={<IconTrash size="1rem" />} color="red">
            Xóa hàng loạt
          </Button>
        </Group>
      </Group>

      <Card withBorder shadow="sm">
        Chức năng sắp xếp, lọc, tìm kiếm đang được xây dựng
      </Card>

      <DataTable
        withBorder
        borderRadius="sm"
        shadow="sm"
        striped
        highlightOnHover
        horizontalSpacing="md"
        verticalSpacing="sm"
        minHeight={250}
        noRecordsText="Không có dữ liệu"
        recordsPerPage={appConstants.defaultPageSize}
        paginationText={({ from, to, totalRecords }) => `Trang ${from} / ${to} (${totalRecords})`}
        totalRecords={response?.totalElements}
        page={page}
        onPageChange={setPage}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
        records={response?.data}
        fetching={isLoading}
        columns={[
          { accessor: 'id', title: 'ID' },
          {
            accessor: 'createdAt',
            title: 'Ngày tạo',
            render: (record) => dateUtils.format(record.createdAt),
          },
          {
            accessor: 'updatedAt',
            title: 'Ngày cập nhật',
            render: (record) => dateUtils.format(record.updatedAt),
          },
          { accessor: 'name', title: 'Tên tỉnh thành' },
          { accessor: 'code', title: 'Mã tỉnh thành' },
          {
            accessor: 'actions',
            title: <Text mr="xs">Thao tác</Text>,
            textAlignment: 'right',
            render: () => (
              <Group spacing="0.25rem" position="right" noWrap>
                <ActionIcon color="green.5">
                  <IconEye size="1rem" />
                </ActionIcon>
                <ActionIcon color="blue.5">
                  <IconEdit size="1rem" />
                </ActionIcon>
                <ActionIcon color="red.5">
                  <IconTrash size="1rem" />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
      />
    </Stack>
  );
}

export default PostManager;
