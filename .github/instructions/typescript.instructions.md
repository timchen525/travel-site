# TypeScript 编码规范

## 目录
- [1. 基本原则](#1-基本原则)
- [2. 命名规范](#2-命名规范)
- [3. 类型系统](#3-类型系统)
- [4. 函数和方法](#4-函数和方法)
- [5. 接口和类型别名](#5-接口和类型别名)
- [6. 类和对象](#6-类和对象)
- [7. 模块和导入](#7-模块和导入)
- [8. 异步编程](#8-异步编程)
- [9. 错误处理](#9-错误处理)
- [10. 注释和文档](#10-注释和文档)
- [11. 最佳实践](#11-最佳实践)

---

## 1. 基本原则

### 1.1 严格模式
始终启用 TypeScript 严格模式：

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

### 1.2 显式类型注解
在以下情况下必须显式声明类型：
- 函数参数
- 函数返回值（除非非常明显）
- 导出的变量、常量和函数
- 复杂的对象和数组

```typescript
// ✅ 好的做法
function calculateTotal(price: number, quantity: number): number {
  return price * quantity
}

export const API_URL: string = 'https://api.example.com'

// ❌ 避免
function calculateTotal(price, quantity) {
  return price * quantity
}
```

---

## 2. 命名规范

### 2.1 变量和常量

```typescript
// ✅ 使用 camelCase 命名变量
let userName: string = 'John'
let userAge: number = 25

// ✅ 使用 UPPER_SNAKE_CASE 命名常量
const MAX_RETRY_COUNT: number = 3
const API_BASE_URL: string = 'https://api.example.com'

// ✅ 布尔变量使用 is/has/should 前缀
let isActive: boolean = true
let hasPermission: boolean = false
let shouldUpdate: boolean = true
```

### 2.2 函数和方法

```typescript
// ✅ 使用 camelCase，动词开头
function getUserById(id: string): User {
  // ...
}

function validateEmail(email: string): boolean {
  // ...
}

async function fetchUserData(userId: string): Promise<User> {
  // ...
}

// ✅ 事件处理函数使用 handle 前缀
function handleClick(event: MouseEvent): void {
  // ...
}

function handleSubmit(data: FormData): void {
  // ...
}
```

### 2.3 类和接口

```typescript
// ✅ 使用 PascalCase 命名类
class UserService {
  // ...
}

class DataManager {
  // ...
}

// ✅ 使用 PascalCase 命名接口
interface User {
  id: string
  name: string
  email: string
}

interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

// ✅ 类型别名也使用 PascalCase
type UserId = string
type RequestStatus = 'pending' | 'success' | 'error'
```

### 2.4 枚举

```typescript
// ✅ 使用 PascalCase 命名枚举，成员使用 PascalCase
enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST',
}

enum HttpStatus {
  Ok = 200,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
}
```

### 2.5 泛型

```typescript
// ✅ 使用单个大写字母或有意义的名称
function identity<T>(value: T): T {
  return value
}

function map<T, U>(array: T[], fn: (item: T) => U): U[] {
  return array.map(fn)
}

// ✅ 更具描述性的泛型名称
interface Repository<TEntity, TId> {
  findById(id: TId): Promise<TEntity | null>
  save(entity: TEntity): Promise<void>
}
```

---

## 3. 类型系统

### 3.1 优先使用类型推断

```typescript
// ✅ 好的做法 - 利用类型推断
const count = 0 // 推断为 number
const message = 'Hello' // 推断为 string
const users = [] as User[] // 明确数组类型

// ❌ 避免 - 不必要的类型注解
const count: number = 0
const message: string = 'Hello'
```

### 3.2 避免使用 any

```typescript
// ❌ 避免使用 any
function processData(data: any): any {
  return data
}

// ✅ 使用具体类型
function processData<T>(data: T): T {
  return data
}

// ✅ 使用 unknown 处理未知类型
function processUnknownData(data: unknown): string {
  if (typeof data === 'string') {
    return data
  }
  return String(data)
}
```

### 3.3 使用联合类型和交叉类型

```typescript
// ✅ 联合类型
type Status = 'pending' | 'success' | 'error'
type Id = string | number

function setStatus(status: Status): void {
  // ...
}

// ✅ 交叉类型
interface Timestamped {
  createdAt: Date
  updatedAt: Date
}

interface User {
  id: string
  name: string
}

type TimestampedUser = User & Timestamped
```

### 3.4 使用类型守卫

```typescript
// ✅ 类型守卫函数
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj
  )
}

// 使用
function processValue(value: unknown): void {
  if (isString(value)) {
    console.log(value.toUpperCase()) // TypeScript 知道这是 string
  }
}
```

### 3.5 使用 Readonly 和 const 断言

```typescript
// ✅ 使用 Readonly
interface Config {
  readonly apiUrl: string
  readonly timeout: number
}

// ✅ 使用 const 断言
const routes = {
  home: '/',
  about: '/about',
  contact: '/contact',
} as const

type Route = typeof routes[keyof typeof routes]

// ✅ ReadonlyArray
function sum(numbers: ReadonlyArray<number>): number {
  return numbers.reduce((a, b) => a + b, 0)
}
```

---

## 4. 函数和方法

### 4.1 函数签名

```typescript
// ✅ 明确的参数和返回类型
function createUser(
  name: string,
  email: string,
  age?: number
): User {
  return {
    id: generateId(),
    name,
    email,
    age: age ?? 0,
  }
}

// ✅ 使用对象参数处理多个参数
interface CreateUserParams {
  name: string
  email: string
  age?: number
  role?: UserRole
}

function createUser(params: CreateUserParams): User {
  const { name, email, age = 0, role = UserRole.User } = params
  return {
    id: generateId(),
    name,
    email,
    age,
    role,
  }
}
```

### 4.2 箭头函数

```typescript
// ✅ 简单的箭头函数
const double = (n: number): number => n * 2

// ✅ 带类型的箭头函数
const fetchUser = async (id: string): Promise<User> => {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}

// ✅ 回调函数类型
type Callback<T> = (value: T) => void

const processItems = <T>(
  items: T[],
  callback: Callback<T>
): void => {
  items.forEach(callback)
}
```

### 4.3 函数重载

```typescript
// ✅ 函数重载
function format(value: string): string
function format(value: number): string
function format(value: Date): string
function format(value: string | number | Date): string {
  if (value instanceof Date) {
    return value.toISOString()
  }
  return String(value)
}
```

---

## 5. 接口和类型别名

### 5.1 接口 vs 类型别名

```typescript
// ✅ 对象形状使用接口
interface User {
  id: string
  name: string
  email: string
}

// ✅ 接口可以扩展
interface Admin extends User {
  permissions: string[]
}

// ✅ 联合类型、元组等使用类型别名
type Status = 'pending' | 'success' | 'error'
type Point = [number, number]
type Callback = (error: Error | null, result: string) => void

// ✅ 映射类型使用类型别名
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
```

### 5.2 接口设计

```typescript
// ✅ 单一职责
interface UserRepository {
  findById(id: string): Promise<User | null>
  save(user: User): Promise<void>
  delete(id: string): Promise<void>
}

// ✅ 可选属性
interface CreateUserDto {
  name: string
  email: string
  age?: number
  avatar?: string
}

// ✅ 索引签名
interface Dictionary<T> {
  [key: string]: T
}

// ✅ 函数类型接口
interface Validator {
  (value: string): boolean
}
```

### 5.3 泛型接口

```typescript
// ✅ 泛型接口
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number
  pageSize: number
  total: number
}

// 使用
async function fetchUsers(): Promise<PaginatedResponse<User>> {
  // ...
}
```

---

## 6. 类和对象

### 6.1 类定义

```typescript
// ✅ 清晰的类定义
class UserService {
  private readonly repository: UserRepository
  private cache: Map<string, User>

  constructor(repository: UserRepository) {
    this.repository = repository
    this.cache = new Map()
  }

  async getUser(id: string): Promise<User | null> {
    // 先检查缓存
    if (this.cache.has(id)) {
      return this.cache.get(id)!
    }

    // 从仓库获取
    const user = await this.repository.findById(id)
    if (user) {
      this.cache.set(id, user)
    }
    return user
  }

  clearCache(): void {
    this.cache.clear()
  }
}
```

### 6.2 访问修饰符

```typescript
// ✅ 合理使用访问修饰符
class BankAccount {
  public readonly accountNumber: string
  private balance: number
  protected transactions: Transaction[]

  constructor(accountNumber: string, initialBalance: number) {
    this.accountNumber = accountNumber
    this.balance = initialBalance
    this.transactions = []
  }

  public getBalance(): number {
    return this.balance
  }

  public deposit(amount: number): void {
    this.validateAmount(amount)
    this.balance += amount
    this.recordTransaction('deposit', amount)
  }

  private validateAmount(amount: number): void {
    if (amount <= 0) {
      throw new Error('Amount must be positive')
    }
  }

  protected recordTransaction(type: string, amount: number): void {
    this.transactions.push({ type, amount, date: new Date() })
  }
}
```

### 6.3 抽象类和继承

```typescript
// ✅ 抽象类
abstract class Shape {
  protected constructor(public readonly name: string) {}

  abstract calculateArea(): number
  abstract calculatePerimeter(): number

  describe(): string {
    return `${this.name}: Area = ${this.calculateArea()}, Perimeter = ${this.calculatePerimeter()}`
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super('Circle')
  }

  calculateArea(): number {
    return Math.PI * this.radius ** 2
  }

  calculatePerimeter(): number {
    return 2 * Math.PI * this.radius
  }
}
```

---

## 7. 模块和导入

### 7.1 导入规范

```typescript
// ✅ 按类型分组导入
// 1. 第三方库
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// 2. 本地模块 - 类型
import type { User, ApiResponse } from '@/types'

// 3. 本地模块 - 组件
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'

// 4. 本地模块 - 工具和服务
import { formatDate, validateEmail } from '@/utils'
import { userService } from '@/services'

// 5. 样式
import '@/assets/styles/main.css'
```

### 7.2 导出规范

```typescript
// ✅ 命名导出（优先）
export interface User {
  id: string
  name: string
}

export function createUser(name: string): User {
  return { id: generateId(), name }
}

export const DEFAULT_TIMEOUT = 5000

// ✅ 默认导出（仅用于组件或单一主要导出）
export default class UserService {
  // ...
}

// ❌ 避免混合使用命名导出和默认导出
```

### 7.3 重新导出

```typescript
// ✅ 模块索引文件
// types/index.ts
export type { User, Admin } from './user'
export type { Product, Category } from './product'
export type { ApiResponse, ApiError } from './api'

// utils/index.ts
export { formatDate, parseDate } from './date'
export { validateEmail, validatePhone } from './validators'
export * from './helpers'
```

---

## 8. 异步编程

### 8.1 Promise 和 async/await

```typescript
// ✅ 使用 async/await
async function fetchUserData(userId: string): Promise<User> {
  try {
    const response = await fetch(`/api/users/${userId}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data: User = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw error
  }
}

// ✅ 并行异步操作
async function fetchMultipleUsers(userIds: string[]): Promise<User[]> {
  const promises = userIds.map(id => fetchUserData(id))
  return Promise.all(promises)
}

// ✅ 处理可选的异步操作
async function getUserWithProfile(userId: string): Promise<{
  user: User
  profile: Profile | null
}> {
  const [user, profile] = await Promise.allSettled([
    fetchUserData(userId),
    fetchUserProfile(userId),
  ])

  return {
    user: user.status === 'fulfilled' ? user.value : null,
    profile: profile.status === 'fulfilled' ? profile.value : null,
  }
}
```

### 8.2 类型化的 Promise

```typescript
// ✅ 明确的 Promise 返回类型
async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  return response.json()
}

// 使用
interface UserData {
  id: string
  name: string
}

const userData = await fetchJson<UserData>('/api/user')
// userData 的类型是 UserData
```

---

## 9. 错误处理

### 9.1 自定义错误类

```typescript
// ✅ 自定义错误类
class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

class ValidationError extends Error {
  constructor(
    message: string,
    public field: string
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}

// 使用
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`)
  
  if (!response.ok) {
    throw new ApiError(
      'Failed to fetch user',
      response.status,
      await response.json()
    )
  }
  
  return response.json()
}
```

### 9.2 错误处理模式

```typescript
// ✅ Result 模式
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E }

async function fetchUserSafe(id: string): Promise<Result<User>> {
  try {
    const user = await fetchUser(id)
    return { success: true, data: user }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error(String(error)),
    }
  }
}

// 使用
const result = await fetchUserSafe('123')
if (result.success) {
  console.log(result.data.name)
} else {
  console.error(result.error.message)
}
```

---

## 10. 注释和文档

### 10.1 JSDoc 注释

```typescript
/**
 * 计算两个数的和
 * @param a - 第一个数字
 * @param b - 第二个数字
 * @returns 两数之和
 * @example
 * ```ts
 * const result = add(2, 3) // 5
 * ```
 */
function add(a: number, b: number): number {
  return a + b
}

/**
 * 用户服务类
 * 负责处理用户相关的业务逻辑
 */
class UserService {
  /**
   * 根据 ID 获取用户
   * @param id - 用户 ID
   * @returns 用户对象，如果未找到则返回 null
   * @throws {ApiError} 当 API 请求失败时
   */
  async getUserById(id: string): Promise<User | null> {
    // ...
  }
}
```

### 10.2 代码注释原则

```typescript
// ✅ 解释"为什么"而不是"是什么"
// 使用 setTimeout 而不是 setInterval 避免重叠执行
function scheduleNextCheck(): void {
  setTimeout(() => {
    checkStatus()
    scheduleNextCheck()
  }, 5000)
}

// ✅ 标记 TODO 和 FIXME
// TODO: 添加缓存机制提高性能
// FIXME: 处理并发请求可能导致的竞态条件
async function fetchData(): Promise<void> {
  // ...
}

// ❌ 避免无用的注释
// 设置用户名
const userName = 'John' // 这个注释是多余的
```

---

## 11. 最佳实践

### 11.1 不可变性

```typescript
// ✅ 使用不可变数据结构
const addUser = (users: readonly User[], newUser: User): User[] => {
  return [...users, newUser]
}

const updateUser = (users: readonly User[], id: string, updates: Partial<User>): User[] => {
  return users.map(user =>
    user.id === id ? { ...user, ...updates } : user
  )
}

// ✅ 使用 Object.freeze 保护对象
const config = Object.freeze({
  apiUrl: 'https://api.example.com',
  timeout: 5000,
})
```

### 11.2 类型安全的配置

```typescript
// ✅ 使用枚举或字面量类型
const CONFIG = {
  API_URL: 'https://api.example.com',
  TIMEOUT: 5000,
  RETRY_COUNT: 3,
} as const

type ConfigKey = keyof typeof CONFIG

// ✅ 环境变量类型化
interface Env {
  NODE_ENV: 'development' | 'production' | 'test'
  API_URL: string
  PORT: number
}

function getEnv(key: keyof Env): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value
}
```

### 11.3 组合优于继承

```typescript
// ✅ 使用组合
interface Logger {
  log(message: string): void
}

interface Cache {
  get(key: string): unknown
  set(key: string, value: unknown): void
}

class UserService {
  constructor(
    private logger: Logger,
    private cache: Cache
  ) {}

  async getUser(id: string): Promise<User> {
    this.logger.log(`Fetching user ${id}`)
    
    const cached = this.cache.get(id)
    if (cached) {
      return cached as User
    }
    
    const user = await this.fetchUser(id)
    this.cache.set(id, user)
    return user
  }

  private async fetchUser(id: string): Promise<User> {
    // ...
  }
}
```

### 11.4 实用工具类型

```typescript
// ✅ 使用内置工具类型
type PartialUser = Partial<User> // 所有属性可选
type RequiredUser = Required<User> // 所有属性必需
type ReadonlyUser = Readonly<User> // 所有属性只读
type UserEmail = Pick<User, 'email'> // 选择特定属性
type UserWithoutId = Omit<User, 'id'> // 排除特定属性

// ✅ 自定义工具类型
type Nullable<T> = T | null
type Optional<T> = T | undefined
type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}
```

### 11.5 避免类型断言

```typescript
// ❌ 避免使用类型断言
const user = data as User

// ✅ 使用类型守卫
function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data &&
    'email' in data
  )
}

if (isUser(data)) {
  // TypeScript 知道 data 是 User
  console.log(data.name)
}
```

---

## 总结

遵循这些 TypeScript 编码规范将帮助您：

1. ✅ 编写更安全、更可维护的代码
2. ✅ 减少运行时错误
3. ✅ 提高代码可读性
4. ✅ 改善团队协作
5. ✅ 充分利用 TypeScript 的类型系统

**记住**：这些规范不是教条，而是经过实践验证的最佳实践。根据项目需求灵活应用。

---

**文档版本**: 1.0  
**最后更新**: 2025年10月16日  
**维护者**: Development Team
