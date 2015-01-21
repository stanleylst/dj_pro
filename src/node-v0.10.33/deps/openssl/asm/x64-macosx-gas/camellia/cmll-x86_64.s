.text



.globl	_Camellia_EncryptBlock

.p2align	4
_Camellia_EncryptBlock:
	movl	$128,%eax
	subl	%edi,%eax
	movl	$3,%edi
	adcl	$0,%edi
	jmp	L$enc_rounds


.globl	_Camellia_EncryptBlock_Rounds

.p2align	4
L$enc_rounds:
_Camellia_EncryptBlock_Rounds:
	pushq	%rbx
	pushq	%rbp
	pushq	%r13
	pushq	%r14
	pushq	%r15
L$enc_prologue:


	movq	%rcx,%r13
	movq	%rdx,%r14

	shll	$6,%edi
	leaq	L$Camellia_SBOX(%rip),%rbp
	leaq	(%r14,%rdi,1),%r15

	movl	0(%rsi),%r8d
	movl	4(%rsi),%r9d
	movl	8(%rsi),%r10d
	bswapl	%r8d
	movl	12(%rsi),%r11d
	bswapl	%r9d
	bswapl	%r10d
	bswapl	%r11d

	call	_x86_64_Camellia_encrypt

	bswapl	%r8d
	bswapl	%r9d
	bswapl	%r10d
	movl	%r8d,0(%r13)
	bswapl	%r11d
	movl	%r9d,4(%r13)
	movl	%r10d,8(%r13)
	movl	%r11d,12(%r13)

	movq	0(%rsp),%r15
	movq	8(%rsp),%r14
	movq	16(%rsp),%r13
	movq	24(%rsp),%rbp
	movq	32(%rsp),%rbx
	leaq	40(%rsp),%rsp
L$enc_epilogue:
	.byte	0xf3,0xc3



.p2align	4
_x86_64_Camellia_encrypt:
	xorl	0(%r14),%r9d
	xorl	4(%r14),%r8d
	xorl	8(%r14),%r11d
	xorl	12(%r14),%r10d
.p2align	4
L$eloop:
	movl	16(%r14),%ebx
	movl	20(%r14),%eax

	xorl	%r8d,%eax
	xorl	%r9d,%ebx
	movzbl	%ah,%esi
	movzbl	%bl,%edi
	movl	2052(%rbp,%rsi,8),%edx
	movl	0(%rbp,%rdi,8),%ecx
	movzbl	%al,%esi
	shrl	$16,%eax
	movzbl	%bh,%edi
	xorl	4(%rbp,%rsi,8),%edx
	shrl	$16,%ebx
	xorl	4(%rbp,%rdi,8),%ecx
	movzbl	%ah,%esi
	movzbl	%bl,%edi
	xorl	0(%rbp,%rsi,8),%edx
	xorl	2052(%rbp,%rdi,8),%ecx
	movzbl	%al,%esi
	movzbl	%bh,%edi
	xorl	2048(%rbp,%rsi,8),%edx
	xorl	2048(%rbp,%rdi,8),%ecx
	movl	24(%r14),%ebx
	movl	28(%r14),%eax
	xorl	%edx,%ecx
	rorl	$8,%edx
	xorl	%ecx,%r10d
	xorl	%ecx,%r11d
	xorl	%edx,%r11d
	xorl	%r10d,%eax
	xorl	%r11d,%ebx
	movzbl	%ah,%esi
	movzbl	%bl,%edi
	movl	2052(%rbp,%rsi,8),%edx
	movl	0(%rbp,%rdi,8),%ecx
	movzbl	%al,%esi
	shrl	$16,%eax
	movzbl	%bh,%edi
	xorl	4(%rbp,%rsi,8),%edx
	shrl	$16,%ebx
	xorl	4(%rbp,%rdi,8),%ecx
	movzbl	%ah,%esi
	movzbl	%bl,%edi
	xorl	0(%rbp,%rsi,8),%edx
	xorl	2052(%rbp,%rdi,8),%ecx
	movzbl	%al,%esi
	movzbl	%bh,%edi
	xorl	2048(%rbp,%rsi,8),%edx
	xorl	2048(%rbp,%rdi,8),%ecx
	movl	32(%r14),%ebx
	movl	36(%r14),%eax
	xorl	%edx,%ecx
	rorl	$8,%edx
	xorl	%ecx,%r8d
	xorl	%ecx,%r9d
	xorl	%edx,%r9d
	xorl	%r8d,%eax
	xorl	%r9d,%ebx
	movzbl	%ah,%esi
	movzbl	%bl,%edi
	movl	2052(%rbp,%rsi,8),%edx
	movl	0(%rbp,%rdi,8),%ecx
	movzbl	%al,%esi
	shrl	$16,%eax
	movzbl	%bh,%edi
	xorl	4(%rbp,%rsi,8),%edx
	shrl	$16,%ebx
	xorl	4(%rbp,%rdi,8),%ecx
	movzbl	%ah,%esi
	movzbl	%bl,%edi
	xorl	0(%rbp,%rsi,8),%edx
	xorl	2052(%rbp,%rdi,8),%ecx
	movzbl	%al,%esi
	movzbl	%bh,%edi
	xorl	2048(%rbp,%rsi,8),%edx
	xorl	2048(%rbp,%rdi,8),%ecx
	movl	40(%r14),%ebx
	movl	44(%r14),%eax
	xorl	%edx,%ecx
	rorl	$8,%edx
	xorl	%ecx,%r10d
	xorl	%ecx,%r11d
	xorl	%edx,%r11d
	xorl	%r10d,%eax
	xorl	%r11d,%ebx
	movzbl	%ah,%esi
	movzbl	%bl,%edi
	movl	2052(%rbp,%rsi,8),%edx
	movl	0(%rbp,%rdi,8),%ecx
	movzbl	%al,%esi
	shrl	$16,%eax
	movzbl	%bh,%edi
	xorl	4(%rbp,%rsi,8),%edx
	shrl	$16,%ebx
	xorl	4(%rbp,%rdi,8),%ecx
	movzbl	%ah,%esi
	movzbl	%bl,%edi
	xorl	0(%rbp,%rsi,8),%edx
	xorl	2052(%rbp,%rdi,8),%ecx
	movzbl	%al,%esi
	movzbl	%bh,%edi
	xorl	2048(%rbp,%rsi,8),%edx
	