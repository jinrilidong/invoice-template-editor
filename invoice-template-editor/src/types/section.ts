/**
 * 统一的Section类型定义
 */

// 基础项目接口
export interface BaseItem {
  id: string
  label: string
  value: string
}

// 表格列接口
export interface TableColumn {
  id: string
  name: string
  type: string
  alignment: 'left' | 'right'
  width?: number // column width percentage (0-100). If omitted, evenly distributed
}

// 表格行接口
export interface TableRow {
  id: string
  data: Record<string, string>
  total: number
}

// Header Section 数据
export interface HeaderData {
  title?: string
  description?: string
  logo?: string
  companyName?: string
  logoSize?: 'default' | 'large'
  logoDescription?: string
}

// Info Section 数据
export interface InfoData {
  id?: string
  sectionTitle?: string
  items?: BaseItem[]
}

// Table Section 数据
export interface TableData {
  id?: string
  sectionTitle: string
  subsectionTitle: string
  columns: TableColumn[]
  rows: TableRow[]
  total: number
  rowsNumber?: number
}

// Description Section 数据
export interface DescriptionData {
  id?: string
  content: string
}

// Item Section 数据
export interface ItemData {
  id?: string
  sectionTitle?: string
  items?: BaseItem[]
}

// H-Info Section 数据
export interface HInfoData {
  id?: string
  sectionTitle?: string
  columns: HInfoColumn[]
  columnWidth?: string
}

// H-Info Column 数据
export interface HInfoColumn {
  id: string
  items: BaseItem[]
}

// Footer Section 数据
export interface FooterData {
  info?: string
  name: string
}

// Section 状态
export interface SectionStates {
  header: boolean
  info: boolean
  table: boolean
  description: boolean
  item: boolean
  hInfo: boolean
  footer: boolean
}

// 完整的模板数据
export interface TemplateData {
  header?: HeaderData
  info?: InfoData[]
  tables?: TableData[]
  description?: DescriptionData[]
  item?: ItemData[]
  hInfo?: HInfoData[]
  footer?: FooterData
}

// 组件Props基础接口
export interface BaseSectionProps<T> {
  modelValue?: T
}

// 组件Emits基础接口
export interface BaseSectionEmits<T> {
  (e: 'update:modelValue', value: T): void
}

// 数组项Props接口
export interface ArraySectionProps<T> {
  modelValue?: { items: T[] }
}

// 数组项Emits接口
export interface ArraySectionEmits<T> {
  (e: 'update:modelValue', value: { items: T[] }): void
}

// 工具类型：创建Section组件的标准Props
export type CreateSectionProps<T> = BaseSectionProps<T>

// 工具类型：创建Section组件的标准Emits
export type CreateSectionEmits<T> = BaseSectionEmits<T>

// 工具类型：创建数组Section组件的标准Props
export type CreateArraySectionProps<T> = ArraySectionProps<T>

// 工具类型：创建数组Section组件的标准Emits
export type CreateArraySectionEmits<T> = ArraySectionEmits<T>

// 默认数据工厂函数类型
export type DefaultDataFactory<T> = () => T

// 数组默认数据工厂函数类型
export type DefaultArrayDataFactory<T> = () => T[]
