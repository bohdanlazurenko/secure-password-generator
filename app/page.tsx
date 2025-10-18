'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { generatePassword, type PasswordOptions } from '@/lib/generator'

export default function Home() {
  const [password, setPassword] = useState<string>('')
  const [passwordLength, setPasswordLength] = useState<number>(16)
  const [copied, setCopied] = useState<boolean>(false)
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true
  })

  const handleGeneratePassword = useCallback(() => {
    try {
      const newPassword = generatePassword({ ...options, length: passwordLength })
      setPassword(newPassword)
      setCopied(false)
    } catch (error) {
      console.error('Error generating password:', error)
    }
  }, [options, passwordLength])

  const handleCopyToClipboard = async () => {
    if (!password) return
    
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy password:', error)
    }
  }

  const handleOptionChange = (key: keyof PasswordOptions, value: boolean) => {
    setOptions(prev => ({ ...prev, [key]: value }))
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Secure Password Generator
        </h1>

        <div className="space-y-6">
          {/* Password Display */}
          <div className="relative">
            <div className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md font-mono text-sm break-all min-h-[48px] flex items-center">
              {password || 'Click generate to create a password'}
            </div>
            {password && (
              <Button
                onClick={handleCopyToClipboard}
                variant="secondary"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-sm"
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            )}
          </div>

          {/* Password Length */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password Length: {passwordLength}
            </label>
            <input
              type="range"
              min="8"
              max="32"
              value={passwordLength}
              onChange={(e) => setPasswordLength(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>8</span>
              <span>32</span>
            </div>
          </div>

          {/* Character Options */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Include:</h3>
            <Checkbox
              label="Uppercase Letters (A-Z)"
              checked={options.includeUppercase}
              onChange={(e) => handleOptionChange('includeUppercase', e.target.checked)}
            />
            <Checkbox
              label="Lowercase Letters (a-z)"
              checked={options.includeLowercase}
              onChange={(e) => handleOptionChange('includeLowercase', e.target.checked)}
            />
            <Checkbox
              label="Numbers (0-9)"
              checked={options.includeNumbers}
              onChange={(e) => handleOptionChange('includeNumbers', e.target.checked)}
            />
            <Checkbox
              label="Symbols (!@#$%^&*)"
              checked={options.includeSymbols}
              onChange={(e) => handleOptionChange('includeSymbols', e.target.checked)}
            />
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGeneratePassword}
            className="w-full"
          >
            Generate Password
          </Button>
        </div>

        {/* Security Tips */}
        <div className="mt-8 p-4 bg-blue-50 rounded-md">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Security Tips:</h3>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Use a unique password for each account</li>
            <li>• Avoid using personal information</li>
            <li>• Consider using a password manager</li>
            <li>• Update passwords regularly</li>
          </ul>
        </div>
      </div>
    </main>
  )
}