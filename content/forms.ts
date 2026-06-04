// content/forms.ts
// Tokyo Decoded LP — フォーム文言
// C-5 管理ファイル。Codex は読み取り専用。

export const formsContent = {
  subscribe: {
    heading: {
      ja: "無料でダウンロード",
      en: "Download for Free",
    },
    inputLabel: {
      ja: "メールアドレス",
      en: "Email address",
    },
    placeholder: {
      ja: "your@email.com",
      en: "your@email.com",
    },
    submitButton: {
      ja: "ダウンロードリンクを受け取る",
      en: "Get the download link",
    },
    submitting: {
      ja: "送信中...",
      en: "Sending...",
    },
    success: {
      heading: {
        ja: "送信しました！",
        en: "Sent!",
      },
      body: {
        ja: "受信ボックスをご確認ください。数分以内にダウンロードリンクをお送りします。届かない場合は迷惑メールフォルダもご確認ください。",
        en: "Please check your inbox. You'll receive the download link within a few minutes. If it doesn't arrive, check your spam folder.",
      },
    },
    error: {
      heading: {
        ja: "送信に失敗しました",
        en: "Something went wrong",
      },
      body: {
        ja: "しばらく経ってから再度お試しください。繰り返し失敗する場合は hello@tokyo-decoded.com にご連絡ください。",
        en: "Please try again in a moment. If the issue persists, contact us at hello@tokyo-decoded.com.",
      },
    },
    validation: {
      required: {
        ja: "メールアドレスを入力してください。",
        en: "Please enter your email address.",
      },
      invalid: {
        ja: "正しいメールアドレスを入力してください。",
        en: "Please enter a valid email address.",
      },
    },
    consent: {
      ja: "登録することで、Editor's Toolsのダウンロードリンクをお送りすることに同意します。メールアドレスを第三者に提供することはありません。",
      en: "By registering, you agree to receive the Editor's Tools download link. We will not share your email with third parties.",
    },
    privacyLink: {
      label_ja: "プライバシーポリシー",
      label_en: "Privacy Policy",
      href: "/privacy",
    },
  },

  contact: {
    heading: {
      ja: "お問い合わせ",
      en: "Get in Touch",
    },
    subheading: {
      ja: "メディア取材・PR案件・コラボのご相談など、お気軽にどうぞ。通常3営業日以内に返信します。",
      en: "Media inquiries, PR partnerships, collaboration ideas — all welcome. We typically reply within 3 business days.",
    },
    fields: {
      name: {
        label_ja: "お名前",
        label_en: "Name",
        placeholder_ja: "山田 太郎",
        placeholder_en: "Jane Smith",
        required: true,
      },
      email: {
        label_ja: "メールアドレス",
        label_en: "Email address",
        placeholder_ja: "your@email.com",
        placeholder_en: "your@email.com",
        required: true,
      },
      subject: {
        label_ja: "件名",
        label_en: "Subject",
        placeholder_ja: "（例）取材についてのご相談",
        placeholder_en: "(e.g.) Media inquiry",
        required: true,
      },
      message: {
        label_ja: "メッセージ",
        label_en: "Message",
        placeholder_ja: "ご用件をできるだけ詳しくお書きください。",
        placeholder_en: "Please describe your inquiry in as much detail as you can.",
        required: true,
      },
    },
    submitButton: {
      ja: "送信する",
      en: "Send Message",
    },
    submitting: {
      ja: "送信中...",
      en: "Sending...",
    },
    success: {
      heading: {
        ja: "送信しました！",
        en: "Message sent!",
      },
      body: {
        ja: "お問い合わせありがとうございます。通常3営業日以内にご返信します。",
        en: "Thank you for reaching out. We'll get back to you within 3 business days.",
      },
    },
    error: {
      heading: {
        ja: "送信に失敗しました",
        en: "Something went wrong",
      },
      body: {
        ja: "しばらく経ってから再度お試しください。繰り返し失敗する場合は hello@tokyo-decoded.com に直接メールをお送りください。",
        en: "Please try again in a moment. If the issue continues, email us directly at hello@tokyo-decoded.com.",
      },
    },
    validation: {
      required: {
        ja: "この項目は必須です。",
        en: "This field is required.",
      },
      emailInvalid: {
        ja: "正しいメールアドレスを入力してください。",
        en: "Please enter a valid email address.",
      },
    },
    recaptcha: {
      notice: {
        ja: "このフォームはスパム対策のため Google reCAPTCHA v3 を使用しています。Googleの",
        en: "This form is protected by Google reCAPTCHA v3. Google's",
      },
      privacyLabel: {
        ja: "プライバシーポリシー",
        en: "Privacy Policy",
      },
      termsLabel: {
        ja: "利用規約",
        en: "Terms of Service",
      },
      conjunction: {
        ja: "および",
        en: "and",
      },
      suffix: {
        ja: "が適用されます。",
        en: "apply.",
      },
      privacyUrl: "https://policies.google.com/privacy",
      termsUrl: "https://policies.google.com/terms",
    },
  },
} as const;
