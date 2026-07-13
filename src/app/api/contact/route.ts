import { NextResponse } from 'next/server';
import { contactRequestService } from '@/services';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phoneNumber, emailAddress, messageBox, locale } = body;

    // Validation — chỉ họ tên và số điện thoại là bắt buộc
    if (!fullName || !phoneNumber) {
      return NextResponse.json(
        { error: 'Vui lòng điền họ tên và số điện thoại.' },
        { status: 400 }
      );
    }

    await contactRequestService.create({
      fullName: String(fullName).trim(),
      phoneNumber: String(phoneNumber).trim(),
      emailAddress: emailAddress ? String(emailAddress).trim() : '',
      messageBox: messageBox ? String(messageBox).trim() : '',
      locale,
    });

    return NextResponse.json({
      success: true,
      message: 'Yêu cầu của bạn đã được gửi thành công. Chúng tôi sẽ liên hệ trong thời gian sớm nhất.'
    });
  } catch (error) {
    console.error('Error saving contact request:', error);
    return NextResponse.json(
      { error: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
